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

    # get the "action" string asuming it's the second part of the path in a url like this: /uwsgi/action
    path_info = env.get('PATH_INFO', '').strip('/').split('/')
    action = path_info[1]

    if action == 'shutdown':
        subprocess.Popen(["/bin/bash", "-c", "sleep 3; sudo poweroff"],
                         text=True)
        response = generateResponse(0, 'Shutting Down...', None)

    elif action == 'reboot':
        subprocess.Popen(["/bin/bash", "-c", "sleep 3; sudo reboot"],
                         text=True)
        response = generateResponse(0, 'Rebooting...', None)

    elif action == 'restart_services':
        sp = subprocess.Popen(
            ["/bin/bash", "/home/pi/internet_rov_code/update_config_files.sh"],
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = generateResponse(sp.returncode, out, err)

    elif action == 'pull_github_code':
        sp = subprocess.Popen([
            "/bin/bash",
            "cd /home/pi/internet_rov_code/; git add .; git stash; git pull"
        ],
                              text=True,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = generateResponse(sp.returncode, out, err)

    elif action == 'status':
        sp = subprocess.Popen(
            ["/bin/bash", "/home/pi/internet_rov_code/rov_login_message.sh"],
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE)
        out, err = sp.communicate()
        response = out + err

    elif action == 'rov_logs':
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
        response = generateResponse(1, None, 'Unknown command: ' + action)

    start_response('200 OK', [('Content-Type', 'text/plain')])
    return str(response).encode('utf-8')
