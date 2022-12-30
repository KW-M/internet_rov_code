# from urllib.parse import parse_qs # for parsing url query string
import asyncio
import logging
# from types import AsyncGeneratorType
from async_timeout import timeout
from protobuf.rov_action_api import RovResponse, DoneResponse, ContinuedOutputResponse

###### setup logging #######
log = logging.getLogger(__name__)


async def run_shell_cmd_async(shell_cmd):
    process = await asyncio.create_subprocess_shell(shell_cmd, stderr=asyncio.subprocess.STDOUT, stdout=asyncio.subprocess.PIPE)  # send stderr (standard error) to stdout (standard output), and pipe stdout to be read by python later in this script
    return process


async def read_full_cmd_output(shell_cmd, cmd_timeout=None) -> tuple[str, str, int]:
    process = await run_shell_cmd_async(shell_cmd)
    try:
        async with timeout(cmd_timeout):
            stdout, stderr = await process.communicate()
            return_code = process.returncode if process.returncode is not None else 1
            return (str(stdout, 'utf-8'), str(stderr, 'utf-8'), return_code)
    except asyncio.exceptions.TimeoutError:
        return ("", "Command timeout reached.", 1)
    except Exception as err:
        log.exception(err)
        return ("", "Py Error: " + str(err), 1)
    finally:
        if process.returncode is None:
            process.kill()


#  -> AsyncGeneratorType[str]
async def read_cmd_output_async(shell_cmd, cmd_timeout=None):
    process = await run_shell_cmd_async(shell_cmd)
    try:
        async with timeout(cmd_timeout):
            while process.stdout:
                line = await process.stdout.readline()
                if not line:
                    break
                yield str(line, 'utf-8').rstrip()
    except asyncio.exceptions.TimeoutError:
        yield "Command timeout reached. No new messages will be printed."
    except Exception as err:
        log.error(err)
        yield "Py Error: " + str(err)
    finally:
        if process.returncode is None:
            process.kill()


async def generate_cmd_continued_output_response(rov_exchange_id, shell_command, cmd_timeout=None):
    i = 0  # counter for the number of messages sent
    cmd_stdout_results = read_cmd_output_async(shell_command, cmd_timeout)
    async for line in cmd_stdout_results:
        if isinstance(line, str):
            i += 1  # increment counter
            if "rov_logs..." in line:
                continue  # avoid sending our own log messages to the client (which would cause message recursion)
            yield RovResponse(rov_exchange_id=rov_exchange_id, continued_output=ContinuedOutputResponse(message=line))
        else:
            log.error("Unexpected type in generate_cmd_continued_output_response: %s", str(type(line)))

    # send done status to indicate that the command has finished
    yield RovResponse(rov_exchange_id=rov_exchange_id, done=DoneResponse())
