def clamp(minimum: float, value: float, maximum: float):
    return max(minimum, min(value, maximum))


def get_rounded_string(value):
    # from: https://stackoverflow.com/questions/20457038/how-to-round-to-2-decimals-with-python/20457284#20457284
    return f'{value:0.3f}'


# -------------------------------------------------------------------------------------

# last_err_message = ""

# def pretty_print_exception(exception, show_traceback=False, msg_socket=None):
#     global last_err_message
#     err_msg = str(exception)
#     if err_msg != last_err_message:
#         if show_traceback:
#             traceback.print_exc()
#             err_msg = traceback.format_exc()
#             if msg_socket:
#                 try:  # try to send the full traceback to the clients's web browser
#                     msg_socket.send_socket_message(
#                         json.dumps({'error': err_msg}))
#                 except:
#                     pass
#         else:
#             print(err_msg)
#         last_err_message = err_msg
#     else:
#         print(".", end='')  # print a dot to show the same error happend again.
