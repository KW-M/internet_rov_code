from ast import Div
import logging
import os
from collections import OrderedDict


class OneLineDuplicateExceptionFormatter(logging.Formatter):
    def __init__(self, *args, **kwargs):
        self.previous_msgs = OrderedDict()
        self.last_msg_hash = None
        self.repeated_message_number = 0
        self.delete_last_line_flag = False
        super().__init__(*args, **kwargs)

    def setHandler(self, handler):
        self.handler = handler

    def formatException(self, exc_info):
        result = super().formatException(exc_info)
        return repr(result)

    def format(self, record):
        result = super().format(record)
        result = result.replace("\n", " ⏎ ")
        if record.exc_text:
            result = result.replace("\\n", " ⏎ ")
        resultHash = hash(result)

        if (resultHash in self.previous_msgs):
            self.previous_msgs[resultHash] += 1
            if resultHash != self.last_msg_hash:
                self.repeated_message_number += 1
                result = "\r{} earlier mesages repeated {} times: {}".format(
                    self.repeated_message_number,
                    self.previous_msgs[resultHash], result)
            else:
                self.repeated_message_number = 0
                result = "\rMessage repeated {} times: {}".format(
                    self.previous_msgs[resultHash], result)
            # self.delete_last_line_flag = True

        else:
            self.repeated_message_number = 0
            self.previous_msgs[resultHash] = 0

        if resultHash != self.last_msg_hash:
            result = "\n" + result
        else:
            result = "\r" + result
        self.last_msg_hash = resultHash

        if (len(self.previous_msgs) > 10):
            self.previous_msgs.pop(last=False)

        return result


# class DuplicateFilter(logging.Filter):
#     ## https://stackoverflow.com/questions/44691558/suppress-multiple-messages-with-same-content-in-python-logging-module-aka-log-co
#     def filter(self, record):
#         # add other fields if you need more granular comparison, depends on your app
#         current_log = (record.module, record.levelno, record.getMessage())
#         if current_log != getattr(self, "last_log", None):
#             self.last_log = current_log
#             return True
#         return False

# class DuplicateFilter(object):
#     def __init__(self):
#         self.previous_msgs = set()

#     def filter(self, record):
#         rv = record.getMessage() not in self.previous_msgs
#         self.msgs.add(record.msg)
#         return rv

handler = logging.StreamHandler()
formatter = OneLineDuplicateExceptionFormatter(logging.BASIC_FORMAT)
# formatter.setHandler(handler)
handler.setFormatter(formatter)
handler.terminator = ""
root = logging.getLogger()
root.setLevel(logging.DEBUG)  # os.environ.get("LOGLEVEL", "info")
root.addHandler(handler)

# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)
logging.info('message')
logging.info("This is an info message")
logging.info("What is this?")
logging.info("This is an info message")
logging.info("This is an info message")
logging.info("This is an info message")
logging.info("2?")
logging.info("This is an info message")
logging.info("What is this?")

logging.info("What is this?")
logging.info("What is this?")
logging.info("What is this?")
logging.info("What is this?")
logging.info("What is this?")
logging.info("What is this?")
logging.info("What is this?")
logging.info("2?")
logging.info("This is an info message")
logging.info("What is this?")
logging.info("2?")
logging.info("This is an info message")
logging.info("What is this?")
logging.info("2?")
logging.info("This is an info message")
logging.info("What is this?")
logging.info("2?")
logging.info("This is an info message")
logging.info("What is this?")

for i in range(10):
    try:
        a = 1 / 0
    except Exception as e:
        logging.warning("This is a warning message", exc_info=e)
