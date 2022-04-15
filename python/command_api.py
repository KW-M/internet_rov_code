# from urllib.parse import parse_qs # for parsing url query string
import json
import asyncio
from types import AsyncGeneratorType
from aiohttp import web  # fallback for these api functions over plain http for when the webrtc datachannel or unix socket fail.


async def runBashCommand(bashCommand):
    sp = await asyncio.create_subprocess_shell(
        bashCommand,
        stderr=asyncio.subprocess.STDOUT,
        stdout=asyncio.subprocess.PIPE
    )  # send stderr (standard error) to stdout (standard output), and pipe stdout to be read by python later in this script
    return sp


async def readFullBashCommandOutput(bashCommand):
    sp = await runBashCommand(bashCommand)
    stdout, stderr = await sp.communicate()
    return (stdout, stderr, sp.returncode)


async def readBashCommandOutputAsync(bashCommand):
    sp = await runBashCommand(bashCommand)
    while True:
        line = await sp.stdout.readline()
        if not line:
            break
        yield str(line, 'utf-8').rstrip()
        #str(line).encode('utf-8')


# def generateJson(statusCode, outputMessage):
#     responseDict = {
#         "status": 'ok' if statusCode == 0 else 'error',
#         "message": outputMessage
#     }
#     return str(json.dumps(responseDict)).encode('utf-8')

# def generateTextResponseFromBashCommand(bashCommand):
#     # start_response('200 OK', [('Content-Type', 'text/plain')])
#     return readBashCommandOutputAsync(bashCommand)

# def generateJsonResponseFromBashCommand(bashCommand):
#     start_response('200 OK', [('Content-Type', 'application/json')])
#     (outputMessage, outputErrMessage,
#      statusCode) = readFullBashCommandOutput(bashCommand)
#     return generateJson(statusCode, outputMessage)


def handleActionCommand(action):

    if action == '/api/disable_wifi':
        return readBashCommandOutputAsync("rfkill block wlan")

    elif action == '/api/enable_wifi':
        return readBashCommandOutputAsync("sudo rfkill unblock wlan")

    elif action == '/api/status':
        return readBashCommandOutputAsync(
            "/home/pi/internet_rov_code/rov_status_message.sh")

    elif action == '/api/restart_services':
        return readBashCommandOutputAsync(
            "/home/pi/internet_rov_code/update_config_files.sh")

    elif action == '/api/pull_github_code':
        return readBashCommandOutputAsync(
            "GIT_HTTP_CONNECT_TIMEOUT=4 cd /home/pi/internet_rov_code/; git add .; git stash; git pull"
        )

    elif action == '/api/rov_logs':
        return readBashCommandOutputAsync(
            "journalctl --unit=rov_python_code --unit=rov_go_code --unit=add_fixed_ip --unit=nginx --no-pager --follow -n 500"
        )

    elif action == '/api/shutdown':
        runBashCommand(
            "sleep 4; sudo poweroff"
        )  # sleep 4 seconds to give time for the response to be sent
        return "Shutting Down..."

    elif action == '/api/reboot':
        runBashCommand(
            "sleep 4; sudo reboot"
        )  # sleep 4 to give time for the shutdown message to be sent
        return "Rebooting..."

    # elifif action == '/api/start_netdata':
    #     return  "sudo systemctl start netdata"

    # elif action == '/api/stop_netdata':
    #     return "sudo systemctl stop netdata"

    else:
        return None


async def generate_webrtc_format_response(cid, action):

    action_result = handleActionCommand(action)

    if action_result is None:
        yield json.dumps({"cid": cid, "err": "Unknown action: " + action})

    elif type(action_result) is str:
        yield json.dumps({"cid": cid, "msg": action_result, "done": True})

    elif type(action_result) is AsyncGeneratorType:
        async for line in action_result:
            yield json.dumps({"cid": cid, "msg": line})
        yield json.dumps({"cid": cid, "done": True})


async def generate_aiohttp_response(request):

    action_result = handleActionCommand(request.path)

    # https://github.com/aio-libs/aiohttp/issues/3952
    response = web.StreamResponse()
    response.content_type = 'text/plain'
    await response.prepare(request)

    if action_result is None:
        msg = str("Error: Unknown action URL: " + request.path).encode('utf-8')
        await response.write(msg)

    elif type(action_result) is str:
        msg = str(action_result).encode('utf-8')
        await response.write(msg)

    elif type(action_result) is AsyncGeneratorType:
        async for line in action_result:
            msg = str(line).encode('utf-8')
            await response.write(msg)

    return response


async def start_aiohttp_api_server():
    app = web.Application()
    app.add_routes([
        web.get('/api/{action}', generate_aiohttp_response, allow_head=False)
    ])
    return await web._run_app(app, port=9129)


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

# def application(environ):
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
