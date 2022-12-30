# NOTE as of yet this is not used, but could be used.

from aiohttp import web  # fallback for these api functions over plain http for when the webrtc datachannel or unix socket fail.


async def generate_aiohttp_response(request):

    # action_result = await handleActionCommand(request.path)

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
    app.add_routes([web.get('/api/{action}', generate_aiohttp_response, allow_head=False)])
    return await web.run_app(app, port=9129)


# def generateTextResponseFromBashCommand(bashCommand):
#     # start_response('200 OK', [('Content-Type', 'text/plain')])
#     return readBashCommandOutputAsync(bashCommand)

# def generateJsonResponseFromBashCommand(bashCommand):
#     start_response('200 OK', [('Content-Type', 'application/json')])
#     (outputMessage, outputErrMessage,
#      statusCode) = readFullBashCommandOutput(bashCommand)
#     return generateJson(statusCode, outputMessage)

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
