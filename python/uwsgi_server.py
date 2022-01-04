# from urllib.parse import parse_qs # for parsing url query string
import json
import subprocess


def runBashCommand(bashCommand):
    sp = subprocess.Popen(
        ["/bin/bash", "-c", bashCommand],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT
    )  # send stderr (standard error) to stdout (standard output)
    return sp


def readBashCommandOutput(bashCommand):
    sp = runBashCommand(bashCommand)
    out, err = sp.communicate()
    return (out, err, sp.returncode)


def readBashCommandOutputAsync(bashCommand):
    # from https://rhodesmill.org/brandon/2013/chunked-wsgi/
    sp = runBashCommand(bashCommand)
    while True:
        line = sp.stdout.readline()
        if not line:
            break
        yield str(line).encode('utf-8')


def generateJson(statusCode, outputMessage):
    responseDict = {
        "status": 'ok' if statusCode == 0 else 'error',
        "message": outputMessage
    }
    return str(json.dumps(responseDict)).encode('utf-8')


def generateTextResponseFromBashCommand(bashCommand, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    return readBashCommandOutputAsync(bashCommand)


def generateJsonResponseFromBashCommand(bashCommand, start_response):
    start_response('200 OK', [('Content-Type', 'application/json')])
    (outputMessage, outputErrMessage,
     statusCode) = readBashCommandOutput(bashCommand)
    return generateJson(statusCode, outputMessage)


# https://yuluyan.com/posts/uwsgi-server/
def application(env, start_response):

    # get the "action" string asuming it's the second part of the path in a url like this: /uwsgi/action
    path_info = env.get('PATH_INFO', '').strip('/').split('/')
    action = path_info[1]

    if action == 'start_netdata':
        return generateJsonResponseFromBashCommand(
            "sudo systemctl start netdata", start_response)

    elif action == 'stop_netdata':
        return generateJsonResponseFromBashCommand(
            "sudo systemctl stop netdata", start_response)

    elif action == 'disable_wifi':
        return generateJsonResponseFromBashCommand("sudo rfkill block wlan0",
                                                   start_response)

    elif action == 'enable_wifi':
        return generateJsonResponseFromBashCommand("sudo rfkill unblock wlan0",
                                                   start_response)
    elif action == 'status':
        return generateTextResponseFromBashCommand(
            "/home/pi/internet_rov_code/rov_status_message.sh", start_response)

    elif action == 'restart_services':
        return generateTextResponseFromBashCommand(
            "/home/pi/internet_rov_code/update_config_files.sh",
            start_response)

    elif action == 'pull_github_code':
        return generateTextResponseFromBashCommand(
            "GIT_HTTP_CONNECT_TIMEOUT=4 cd /home/pi/internet_rov_code/; git add .; git stash; git pull",
            start_response)

    elif action == 'rov_logs':
        return generateTextResponseFromBashCommand(
            "journalctl --unit=rov_python_code --unit=rov_uwsgi_server --unit=add_fixed_ip --unit=nginx --unit=ngrok --unit=uv4l_raspicam --no-pager --follow -n 500",
            start_response)

    elif action == 'shutdown':
        runBashCommand(
            "sleep 8; sudo poweroff"
        )  # sleep 8 seconds to give time for the response to be sent
        start_response('200 OK', [('Content-Type', 'application/json')])
        return generateJson(0, 'Shutting Down...')

    elif action == 'reboot':
        runBashCommand(
            "sleep 8; sudo reboot"
        )  # sleep 8 to give time for the shutdown message to be sent
        start_response('200 OK', [('Content-Type', 'application/json')])
        return generateJson(0, 'Rebooting...')

    else:
        start_response('200 OK', [('Content-Type', 'application/json')])
        return generateJson(1, 'Unknown command: ' + action)

# import time

# body = r"""\
# <!DOCTYPE html>
# <html>
#     <head>
#         <title>Streaming response demo</title>
#         <script type="text/javascript">
#             function fetch() {
#                  var req = new XMLHttpRequest();
#                 var elem = document.getElementById('buffer');
#                 req.open('post', '/uwsgi/', true);
#                 var toCaptureFrom = 0;
#                 req.onreadystatechange = function() {
#                     switch (req.readyState) {
#                     case XMLHttpRequest.HEADERS_RECEIVED:
#                         toCaptureFrom = 0;
#                         break;
#                     case XMLHttpRequest.LOADING:
#                         captured = req.responseText.substr(toCaptureFrom);
#                         toCaptureFrom += captured.length;
#                         elem.value += '[' + captured + "]\n";
#                         break;
#                     case XMLHttpRequest.DONE:
#                         elem.value += "DONE\n\n";
#                         // Allow garbage collection.
#                         req.onreadystatechange = null;
#                         break;
#                     }
#                 }
#                 req.send();
#                 return false;
#             }
#         </script>
#     </head>
#     <body>
#         <form method="POST" action="" onsubmit="return fetch()">
#             <input type="submit">
#         </form>
#         <textarea id="buffer" cols="60" rows="20"></textarea>
#     </body>
# </html>
# """


# def application(environ, start_response):
#     if environ['REQUEST_METHOD'] == 'GET':
#         response_headers = [
#             ('Content-Type', 'text/html'),
#             ('Content-Length', str(len(body))),
#         ]
#         start_response('200 OK', response_headers)
#         yield str(body).encode('utf-8')
#     else:
#         response_headers = [('Content-Type', 'text/plain')]
#         start_response('200 OK', response_headers)
#         for bit in ['Each ', 'bit ', 'should ', 'be a ', 'chunk.']:
#             yield str(bit).encode('utf-8')
#             time.sleep(1)