from urllib.parse import parse_qs
import json
import subprocess


def generateResponse(statusCode, outputMessage, outputErrMessage):
    responseDict = {
        "status": 'ok' if statusCode == 0 else 'error',
    }
    if outputMessage:
        responseDict['output'] = outputMessage
    if outputErrMessage:
        responseDict['error'] = outputErrMessage
    return json.dumps(responseDict)


def generateResponseFromSubprocess(subprocessResult):
    # Generate response from subprocess
    out, err = subprocessResult.communicate()
    response = generateResponse(subprocessResult.returncode, out, err)
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
        sp = subprocess.Popen([
            "/bin/bash",
            "-c '/home/pi/intenet_rov_code/update_config_files.sh'"
        ],
                              text=True,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE).wait()
        response = generateResponseFromSubprocess(sp)

    elif path_info[1] == 'pull_github_code':
        sp = subprocess.Popen([
            "/bin/bash", "-c",
            "cd /home/pi/internet_rov_code/; git add .; git stash; git pull"
        ],
                              text=True,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE).wait()
        response = generateResponseFromSubprocess(sp)

    elif path_info[1] == 'status':
        sp = subprocess.Popen([
            "/bin/bash", "-c", "/home/pi/intenet_rov_code/rov_login_message.sh"
        ],
                              text=True,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE).wait()
        response = generateResponseFromSubprocess(sp)

    else:
        response = generateResponse(1, None,
                                    'Unknown command: ' + path_info[1])

    start_response('200 OK', [('Content-Type', 'text/html')])
    return str(response).encode('utf-8')
