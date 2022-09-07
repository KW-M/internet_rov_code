# from urllib.parse import parse_qs # for parsing url query string
import asyncio
import logging
from types import AsyncGeneratorType
from aiohttp import web  # fallback for these api functions over plain http for when the webrtc datachannel or unix socket fail.
from async_timeout import timeout

###### setup logging #######
log = logging.getLogger(__name__)


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


async def readBashCommandOutputAsync(bashCommand, Timeout=None):
    sp = await runBashCommand(bashCommand)
    try:
        async with timeout(Timeout):
            while True:
                line = await sp.stdout.readline()
                if not line:
                    break
                yield str(line, 'utf-8').rstrip()
                #str(line).encode('utf-8')
    except asyncio.exceptions.TimeoutError:
        yield "Command timeout. No new messages will be printed."
    except Exception as e:
        log.Error(e)
    finally:
        if (sp.returncode is None):
            sp.kill()


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


async def handleActionCommand(action):

    if action == 'disable_wifi':
        return readBashCommandOutputAsync("rfkill block wlan", Timeout=5)

    if action == 'enable_wifi':
        return readBashCommandOutputAsync("sudo rfkill unblock wlan",
                                          Timeout=5)

    if action == 'rov_status_report':
        return readBashCommandOutputAsync(
            "/home/pi/internet_rov_code/rov_status_report.sh", Timeout=20)

    if action == 'restart_rov_services':
        return readBashCommandOutputAsync(
            "/home/pi/internet_rov_code/update_config_files.sh", Timeout=20)

    if action == 'rov_logs':
        return readBashCommandOutputAsync(
            "journalctl --unit=rov_python_code --unit=rov_go_code --unit=add_fixed_ip --unit=nginx --no-pager --follow -n 500",
            Timeout=20)

    if action == 'shutdown_rov':
        await runBashCommand(
            "sleep 4; sudo poweroff"
        )  # sleep 4 seconds to give time for the response message to be sent
        return "Shutting Down..."

    if action == 'reboot_rov':
        await runBashCommand(
            "sleep 4; sudo reboot"
        )  # sleep 4 seconds to give time for the response message to be sent
        return "Rebooting..."

    # elifif action == 'start_netdata':
    #     return  "sudo systemctl start netdata"

    # elif action == 'stop_netdata':
    #     return "sudo systemctl stop netdata"

    return None


async def generate_webrtc_format_response(
    cid,
    action,
):

    action_result = await handleActionCommand(action)

    if action_result is None:
        yield {
            "cid": cid,
            "status": "error",
            "val": "Unknown action: " + action
        }

    elif isinstance(action_result, str):
        yield {"cid": cid, "val": action_result, "status": "done"}

    elif isinstance(action_result, AsyncGeneratorType):
        i = 0  # counter for the number of messages sent
        async for line in action_result:
            i += 1  # increment counter
            if ("rov_logs...") in line:
                continue  # avoid sending our own log messages to the client (which would cause message recursion)
            yield {
                "cid": cid,
                "val": line + "\n",
                "status": action + "..." + str(i)
            }
        # send done status to indicate that the command has finished
        yield {"cid": cid, "status": "done"}


async def generate_aiohttp_response(request):

    action_result = await handleActionCommand(request.path)

    # https://github.com/aio-libs/aiohttp/issues/3952
    response = web.StreamResponse()
    response.content_type = 'text/plain'
    await response.prepare(request)

    if action_result is None:
        msg = str("Error: Unknown action URL: " + request.path).encode('utf-8')
        await response.write(msg)

    elif isinstance(action_result, str):
        msg = str(action_result).encode('utf-8')
        await response.write(msg)

    elif isinstance(action_result, AsyncGeneratorType):
        async for line in action_result:
            msg = str(line).encode('utf-8')
            await response.write(msg)

    return response


async def start_aiohttp_api_server():
    app = web.Application()
    app.add_routes([
        web.get('/api/{action}', generate_aiohttp_response, allow_head=False)
    ])
    return await web.run_app(app, port=9129)


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
