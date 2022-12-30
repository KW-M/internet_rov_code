# internet_rov_code

### Installing on a Raspberry PI:

1. Connect the PI to the internet via Ethernet or Wifi.
2. Clone this repo to the rasberry pi home folder by running `cd ~/` Then `git clone https://github.com/KW-M/internet_rov_code.git` in a terminal (cmd prompt) or ssh session.
3. `cd internet_rov_code` to get into the cloned folder.
4. Run `sudo chmod +x ./setup_internet_rov_pi.sh` to mark the setup script as executable.
5. Run the setup with `./setup_internet_rov_pi.sh`
6. Reboot.

## running/testing locally

run each below command in a sepearate terminal window.

```sh
python3 ./python/main.py --config-file ./new_config_files/rov-config.json
webrtc-relay -config-file ./new_config_files/rov-config.json
```

### My development workflow

1. Make changes to the config files or python code in the internet_rov_code folder. - I like using the visual studio code remote ssh extension to edit code on the pi.
2. run **update_config_files.sh** to replace the configs in system folders with the new ones in the internet_rov_code folder and then it restarts all the services and python code.
3. Test.
4. If I need to install something or add a new kind of config file, add the commands I used to the end of setup_internet_rov.sh and/or update_config_files.sh with a comment or link explaining why or how to do the same thing manually.

### Raspberry Pi Software Organization

(How the different parts of the ROV code work together)

**setup_internet_rov.sh**

> Script to run all the commands to install everything and put it in the right places. After first successful run, it puts a marker file on the desktop, so that subsequent runs of the script will only update changed config files from the /new-config-files folder in the rov code folder and restart all the systemd services, instead of downloading everything again. I tried to comment it well so please see the links for more info about each part inside the script.

**webrtc-relay**
>
> \- configured using rov-config.json
>
> Relay that handles sending the video and two way data over the wire using the webRTC protocol.
Behind the scenes it initially opens a "web socket" to the public PeerJS signalling server that allow the remote driver's computer and the raspberry pi locate and talk to each other over the internet. Then the remote driver's browser opens a webRTC data channel that go directly between the driver’s computer and the raspberry pi (no server in between). Then the rov opens "media calls" the driver with the vide stream in a WEBRTC "media channel". The website Javascript uses the PeerJS webRTC signalling  that handles all the web socket handshakes and stuff.

**Python3**

> Recives and sends messages with the remote browser through the *LOCAL* grpc connection with the webrtc-relay. NOTE that this grpc interface with the webrtc-relay also uses protobuf messages, *BUT* they are not the same as the ones used between the driver's browser and the python, instead the grpc calls / messages control and get updates from the webrtc-relay program on the pi. The python code is also responsible for keeping track of authenticated drivers and handling all the user actions and rov control logic.

> The frontend sends updates as protobuf encoded bytes whenever the driver moves the game controller joysticks with the calculated desired velocity of the rov. The python then drives the motor controllers such that the rov achives that thrust direction. If no driver is connected, no driver messages are recived recently, or exceptions are raised in the python code, it stops all motors until one of those conditions changes (see bottom of message_handler.py).

**Systemd**

- Built in service of rasberry pi.

- Everything above is started when the raspberry pi boots up and kept in check using what are called systemd services which are configured using the name_of_a_program.service files in the new_config_files/ folder.

Each service is supossed to be restarted by systemd if it crashes.

**nginx**

> A widely used web server.
>
> \- configured using nginx.config
>
> We are using it to:
>
> 1. When public internet access is unavailable it can "serve" or send all of the static website html/css/javascript to the driver’s web browser locally so they get a nice user interface that handles all the user side stuff.
>
> 2. Show various logs/debugging stuff on convenient url paths locally.
>
> 3. (If we use ngrok in the future) Funnel all the connections we need to/from the raspberry pi through the default internet port (:80) because ngrok can only tunnel one port. Also "proxy-pass" the ngrok dashboard to url path /ngrok_dashboard/ on port 80


### Building the ROV

See "ROV BUILD GUIDE.md" (ask Kyle for it)
