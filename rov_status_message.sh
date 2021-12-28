#!/bin/bash

# script will be the custom text that shows when you open an ssh / terminal / bluetooth serial terminal
# From: https://raspberrypi.stackexchange.com/questions/73681/raspberry-pi-custom-ssh-normal-login-message

echo "========================="
echo "Welcome to Raspberry ROV!"
echo "========================="

# from: https://stackoverflow.com/questions/8529181/which-terminal-command-to-get-just-ip-address-and-nothing-else
echo "The ROV's IP addresses are:"
# from
PUBLIC_IP=$(wget -q -O - http://icanhazip.com/ | tail)
if [ $PUBLIC_IP ]; then
    echo "Public IP: $PUBLIC_IP"
else
    echo "Public IP: No Internet Connection"
fi
# list all local ip addresses
hostname --all-ip-addresses | xargs echo | sed 's/ /\n/g'
echo "`hostname`.local - This is the pi's mDNS name, it might work."
echo "";
echo "========================="
echo "";
echo "Bluetooth status: `rfkill list bluetooth`"
echo "WIFI status: `rfkill list wlan`"
echo "NOTE: Run 'rfkill unblock wlan' to enable wifi or 'rfkill block wlan' to disable wifi"
echo "";
echo "========================="
echo "";
echo "Systemd Services Status:"
echo "------------------------"
#check if services are active, if not, show their status:
if systemctl -q is-active uv4l_raspicam.service; then
    echo "uv4l_raspicam.service is active"
else
    systemctl status --no-pager uv4l_raspicam.service
fi
echo "------------------------"
if systemctl -q is-active rov_bluetooth_terminal.service; then
    echo "rov_bluetooth_terminal.service is active"
else
    systemctl status --no-pager rov_bluetooth_terminal.service
fi
echo "------------------------"
if systemctl -q is-active netdata.service; then
    echo "netdata.service is active"
else
    systemctl status --no-pager netdata.service
fi
echo "------------------------"
if systemctl -q is-active add_fixed_ip.service; then
    echo "add_fixed_ip.service is active"
else
    systemctl status --no-pager add_fixed_ip.service
fi
echo "------------------------"
if systemctl -q is-active ngrok.service; then
    echo "ngrok.service is active"
else
    systemctl status --no-pager ngrok.service
fi
echo "------------------------"
if systemctl -q is-active bluetooth.service; then
    echo "bluetooth.service is active"
else
    systemctl status --no-pager bluetooth.service
fi
echo "------------------------"
if systemctl -q is-active nginx.service; then
    echo "nginx.service is active"
else
    systemctl status --no-pager nginx.service
fi
echo "------------------------"
if systemctl -q is-active rov_python_code.service; then
    echo "rov_python_code.service is active"
else
    systemctl status --no-pager rov_python_code.service
fi
echo "------------------------"
if systemctl -q is-active rov_uwsgi_server.service; then
    echo "rov_uwsgi_server.service is active"
else
    systemctl status --no-pager rov_uwsgi_server.service
fi
echo "";
echo "========================="
let upSeconds=$(/usr/bin/cut -d. -f1 /proc/uptime)
let secs=$((${upSeconds}%60))
let mins=$((${upSeconds}/60%60))
let hours=$((${upSeconds}/3600%24))
let days=$((${upSeconds}/86400))
UPTIME=`printf "%d days, %02dh%02dm%02ds" "$days" "$hours" "$mins" "$secs"`

# get the load averages
read one five fifteen rest < /proc/loadavg

echo "$(tput setaf 2)
   .~~.   .~~.    `date +"%A, %e %B %Y, %r"`
  '. \ ' ' / .'   `uname -srmo`$(tput setaf 1)
   .~ .~~~..~.
  : .~.'~'.~. :   Uptime.............: ${UPTIME}
 ~ (   ) (   ) ~  Memory.............: `cat /proc/meminfo | grep MemFree | awk {'print($2 * 0.001)'}`MB (Free) / `cat /proc/meminfo | grep MemTotal | awk {'print($2 * 0.001)'}`MB (Total)
( : '~'.~.'~' : ) Load Averages......: ${one}, ${five}, ${fifteen} (1, 5, 15 min)
 ~ .~ (   ) ~. ~  Running Processes..: `ps ax | wc -l | tr -d " "`
  (  : '~' :  )   CPU Temperature....: `/opt/vc/bin/vcgencmd measure_temp | awk -F "[=\']" '{print($2)}'`'c
   '~ .~~~. ~'    Disk Space.........: `df -h | grep /dev/root | awk {'print $5'}` full (`df -h | grep /dev/root | awk {'print $3'}` used of `df -h | grep /dev/root | awk {'print $2'}`)
       '~'
$(tput sgr0)"
echo "";
echo "========================="
echo "";
echo "Internet ROV Code on this Pi vs on Github:";
cd /home/pi/internet_rov_code/
git status;
echo "";
echo "========================="
echo "";
/bin/bash /home/pi/internet_rov_code/show_system_warnings.sh






