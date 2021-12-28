from urllib.parse import parse_qs
import json
import subprocess


def generateResponse(statusCode, outputMessage, outputErrMessage):
    responseDict = {
        "status": 'ok' if statusCode == 0 else 'error',
    }
    if outputErrMessage:
        responseDict['error'] = outputErrMessage
    if outputMessage:
        responseDict['message'] = outputMessage

    return json.dumps(responseDict)


def generateResponseFromSubprocess(sp):
    # Generate response from subprocess
    out, err = sp.communicate()
    response = generateResponse(sp.returncode, out, err)
    return response


# https://yuluyan.com/posts/uwsgi-server/
def application(env, start_response):
    path_info = env.get('PATH_INFO', '').strip('/').split('/')
    # query_string = parse_qs(env.get('QUERY_STRING', ''))

    if path_info[1] == 'shutdown':
        subprocess.Popen(["/bin/bash", "-c", "sleep 3; sudo poweroff"],
                         text=True)
        response = generateResponse(0, 'Shutting Down...', None)

    elif path_info[1] == 'reboot':
        subprocess.Popen(["/bin/bash", "-c", "sleep 3; sudo reboot"],
                         text=True)
        response = generateResponse(0, 'Rebooting...', None)

    elif path_info[1] == 'restart_services':
        sp = subprocess.Popen(
            ["/bin/bash", "/home/pi/internet_rov_code/update_config_files.sh"],
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = generateResponse(sp.returncode, out, err)

    elif path_info[1] == 'pull_github_code':
        sp = subprocess.Popen([
            "/bin/bash",
            "cd /home/pi/internet_rov_code/; git add .; git stash; git pull"
        ],
                              text=True,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = generateResponse(sp.returncode, out, err)

    elif path_info[1] == 'status':
        sp = subprocess.Popen(
            ["/bin/bash", "/home/pi/internet_rov_code/rov_login_message.sh"],
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = out + err

    elif path_info[1] == 'rov_logs':
        sp = subprocess.Popen([
            "/bin/bash", "-c",
            "journalctl --unit=rov_python_code --unit=rov_uwsgi_server --unit=add_fixed_ip --unit=nginx --unit=ngrok --unit=uv4l_raspicam --no-pager -n 500"
        ],
                              text=True,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = out + err

    else:
        response = generateResponse(1, None,
                                    'Unknown command: ' + path_info[1])

    start_response('200 OK', [('Content-Type', 'text/plain')])
    return str(response).encode('utf-8')
