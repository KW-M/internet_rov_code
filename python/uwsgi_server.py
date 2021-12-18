from urllib.parse import parse_qs
import json
import subprocess


# https://yuluyan.com/posts/uwsgi-server/
def application(env, start_response):
    path_info = env.get('PATH_INFO', '').strip('/').split('/')
    # query_string = parse_qs(env.get('QUERY_STRING', ''))

    response = ""
    if path_info[1] == 'shutdown':
        response = subprocess.Popen(["/bin/bash", "-c", "sleep 0;echo 'ocean'"])
    elif path_info[1] == 'reboot':
        response = subprocess.Popen(["/bin/bash", "-c", "sleep 2;echo 'ocean'"])
    elif path_info[1] == 'restart_services':
        pass
    elif path_info[1] == 'pull_github_code':
        subprocess.Popen(["/bin/bash", "-c", "sleep 2;echo 'ocean'"])
    # response = '<h4>PATH_INFO</h4>' + '[' + ', '.join(path_info) + ']'
    # response += '<h4>QUERY_STRING</h4>' + '\n'.join([
    #     "%s: %s" % (key, '[' + ', '.join(value) + ']')
    #     for key, value in query_string.items()
    # ])

    start_response('200 OK', [('Content-Type', 'text/html')])
    return response.encode('utf-8')
