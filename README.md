# internet_rov_code

### Installing on a Raspberry PI:

1. Connect the PI to the internet via Ethernet or Wifi.
2. Clone this repo to the rasberry pi desktop by running `cd ~/Desktop` Then `git clone https://github.com/KW-M/internet_rov_code.git` in a terminal (cmd prompt) or ssh session.
3. `cd internet_rov_code` to get into the cloned folder.
4. Run `sudo chmod +x ./setup_internet_rov_pi.sh` to mark the setup script as executable.
5. Run the setup with `./setup_internet_rov_pi.sh`
6. Reboot. You might need to run the script again to make the adafruit circuit python installer happy.

## running/testing locally

run each below command in a sepearate terminal window.

```sh
python3 ./python/main.py --config-file ./rov-config.json
webrtc-relay -config-file ./rov-config.json
cd ./website_static_files; npm run start
```

### My development workflow

1. Make changes to the config files or python code in the internet_rov_code folder. - I like using the visual studio code remote ssh extension to edit code on the pi.
2. run **setup_internet_rov.sh** again to replace the configs in system folders with the new ones in the internet_rov_code folder and then it restarts all the services and python code.
3. Test.
4. If I need to install something or add a new kind of config file, add the commands I used to the end of setup_internet_rov.sh with a comment or link explaining why or how to do the same thing manually.

### Raspberry Pi Software Organization

(How the different parts of the ROV code work together)

**setup_internet_rov.sh**

> Script to run all the commands to install everything and put it in the right places. After first successful run, it puts a marker file on the desktop, so that subsequent runs of the script will only update changed config files from the /new-config-files folder in the rov code folder and restart all the systemd services, instead of downloading everything again. I tried to comment it well so please see the links for more info about each part inside the script.

**webrtc-relay**

> Relay that handles sending the video and two way data over the wire using the webRTC protocol.
>
> \- UV4L is configured using the uv4l-raspicam.config file.
>
> It initially opens a "web socket" (which must go through the ngrok tunneling server) that allow the remote driver's computer and the raspberry pi locate and talk to each other over the internet. Then it opens a webRTC video channel and a data channel that go directly between the driver’s computer and the raspberry pi. UV4l handles all of this pretty much for us, but there is the webRTC signalling library in the website javascript code that handles all the web socket handshakes and stuff.

**nginx**

> A widely used web server.
>
> \- configured using nginx.config
>
> We are using it to:
>
> 1. "serve" or send all of the static website html/css/javascript to the driver’s web browser so they get a nice user interface that handles getting the video feed and and sending game controller data back data.
>
> 2. Show various logs/debugging stuff/the dashboards for ngrok and uv4l on convenient url paths.
>
> 3. Funnel all the connections we need to/from the raspberry pi through the default internet port (:80) because ngrok can only tunnel one port.
>
> 4. 1. By default uv4l sends streaming data (websocket, webrtc and dashboard) over one port set in the config but it won’t let you use it’s own built in webserver to serve static files on the same port (hence putting nginx in the middle to redirect or "proxy-pass" UV4l’s streaming IP port to IP port 80 on a different url path (/stream/ and /stream/webrtc).
>    2. I also "proxy-pass" the ngrok dashboard to url path /ngrok_dashboard/ on port 80 and the uv4l dashboard to /uv4l_dashbaord/ on port 80 using nginx

**Python3**

> Recives and sends messages with the remote browser through a "socket" "file" that the UV4l Program opens (Creates?) when it receives a connection,

> The frontend sends updates as json encoded objects ("dicts" in python parlance) whenever the driver moves the game controller joysticks with the calculated desired speed of each motor between 1 and -1. The python then calls the motor conroller library to do that. If any exceptions are raised in the python code it stops all motors and retries the connection.

- TODO: implement watchdog ping on frontend to ping the python
- TODO: implement sending only motor speed changes in JSON not JSON representation of all motor states.

**Systemd**

- Built in service of rasberry pi.

- Everything above is started when the raspberry pi boots up and kept in check using what are called systemd services which are configured using the program.service files in the new_config_files/ folder of the internet_rov_code folder.

Each service is supossed to be restarted by systemd if it crashes.

- TODO: The python code is also starts the systemd "watchdog" feature which will kill and restart the python code if it fails to send a message to the watchdog for x seconds. See watchdog.py

- - In tern the python code watches uv4l (which has a habit of sort of crashing if random internet lapses happen) by expecting to receive a ping from the driver’s laptop through uv4l webrtc datachanel every 2 seconds. If that ping isn’t heard by the python code, it force kills the uv4l process and starts the uv4l systemd service again (maybe also should kill nginx, but not ngrok, because it will get a new url).

### BUILD

I'd probably either get a premade solid core cat-8 cable and use power over eithernet. Look up the poe standards, or use all 4spare wires for positive power and a beefy external wire for negative.

To install, cut a hole in the box and cut away the external plastic schethe around the Ethernet where it will go through the box, then permanently epoxy the small cable wires through the container with some hot glue for strain relief or a metal penetrator. Then get the 4 wires will go to the pi and the rest will go to the motor controller and buck step down voltage converter for the raspi 5volts.

It sounds like the mini pi's won't be powerful enough to handle video compression, so get a Ras pi 3b+ or 4

the little motor controllers fit nicely on the

- the Power over eithernet pins are broken out on the rasberry pi, so we could use them easilly.
