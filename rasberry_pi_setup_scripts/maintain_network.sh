#!/bin/bash

# This script is meant to be run as a systemd service.
# It does two things by monitoring the network interfaces for changes.
# 1. It enables wifi on the Pi if it is not already enabled, and disables it if no known network can be found & connected to within 5 minutes.
# 2. It ensures that the Pi has a semi-fixed IP address on any network (so it can be accessed
# by a smartphone browser without mdns) and also a dynamic IP address (so it can access the internet without confusing a router - such as a teathering phone).

# Enable wifi:
echo "enabling wifi"
sudo rfkill unblock wifi
START_TIME=$(date +%s) # Unix epoch time in seconds
WIFI_FOUND=0

# check if wifi is already connected
if ip --json link list | python3 -c "import sys, json; data=json.load(sys.stdin); exit(0 if True in [d.get('ifname','') == 'wlan0' and d.get('operstate','') == 'UP' for d in data] else 1)"; then
  WIFI_FOUND=1
fi
echo "WIFI_FOUND = $WIFI_FOUND"

# Montor the Pi's network interfaces for changes (because a network interface can come online/offline)
# Command Explainer: uses awk to split the output of `ip monitor link` on ': ' and then pipe the second column if it
# is not empty (the second column is the interface name). We use the command '' we assign that to the variable `iface` with `while read`
# - then add our fixed ip address to that interface (so it will hopefully have 2 ip addresses).
# - if that interface does not have a dynamic ip, we ask dchp(cd) to assign a dynamic one in addition.
#    - this ensures whatever network we're on is happy because it can give us some IP address of its choosing.
# read -t 3 -r link_change < <(ip monitor link)
while true
do
    while read -t 20 -r link_change < <(ip monitor link)
    do
        echo "$link_change"
        iface=$(echo "$link_change" | awk -W interactive -F '\t' '{if ($2) print $2;}')

        # skip loopback interface
        if [ "$iface" = "lo" ]; then
            continue
        fi

        if [ "$iface" = "wlan0" ]; then
            echo "wifi found!"
            WIFI_FOUND=1
        fi

        echo "Interface ${iface} changed. Checking it in 20 seconds..."

        # # wait a delay to make sure the interface has a chance to get fully connected.
        # sleep 10s

        echo "Now checking interface ${iface}"
        # ip addr list "${iface}"

        # check if the network interface is connected / "up"
        if ip addr list "${iface}" | grep 'LOWER_UP' > /dev/null; then
            echo "${iface} is up"
            # chek if have a dynamically (dchp) assigned IP address:
            # ip --json addr list "wlan0"
            if ip addr list "${iface}" | grep 'inet ' | grep 'dynamic' > /dev/null; then
                echo "${iface} has dynamic ip"
                # we must only add a second fixed (so not really static) ip address with the same first parts of the ip as the dynamic ip given by the phone, otherwise android will reject the new ip.
                # modified from: https://unix.stackexchange.com/questions/329083/how-to-replace-the-last-octet-of-a-valid-network-address-with-the-number-2
                current_dynamic_ip=$(ip addr list "${iface}" | grep 'inet ' | grep 'dynamic' | awk -W interactive -F ' ' '{if ($2) print $2;}')
                # get desired fixed ip like xxx.xxx.xxx.88 where 88 is the only octet different from the dynamic ip
                desired_fixed_ip=$(echo $current_dynamic_ip | awk -W interactive -F '.' '{print $1"."$2"."$3".88"}')

                # check if we have our desired fixed IP address assigned to the interface as well
                if ip addr list "${iface}" | grep "$desired_fixed_ip" > /dev/null; then
                    # do nothing, we already have the fixed IP address we want
                    continue
                else
                    # otherwise we can add our fixed IP address to this interface.
                    echo "Adding secondary fixed IP $desired_fixed_ip to ${iface}."
                    sudo ip address add "${desired_fixed_ip}/24" dev "${iface}" broadcast + || true
                fi
            else
                echo "No dynamic IP address assigned to ${iface}."

                # check if we ended up with a fixed ip (even though we don't have a dynamic one)
                if ip addr list "${iface}" | grep 'inet ' | grep ".88/24" > /dev/null; then
                    current_fixed_ip=$(ip addr list "${iface}" | grep 'inet ' | grep ".88/24" | awk -W interactive -F ' ' '{if ($2) print $2;}')
                    echo "Attempting to delete fixed ip ${current_fixed_ip} from ${iface}."
                    sudo ip address del "${current_fixed_ip}" dev "${iface}" broadcast + || true
                fi

                echo "Addding dynamic ip by rebinding dchp assinged ip on ${iface}."
                sudo dhcpcd --rebind "${iface}"
            fi
        fi
    done

    # if we're here, the read timed out:
    CURRENT_TIME=$(date +%s)
    timeDiff=$(($CURRENT_TIME-$START_TIME))
    if [ "$WIFI_FOUND" = "0" ] && [ $timeDiff -gt 60 ]; then
        echo "No WIFI found. Disabling wifi.";
        # sudo rfkill block wifi
        WIFI_FOUND=-1
    fi
done
