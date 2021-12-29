#!/bin/bash

# Montors the Pi's network interfaces for changes (because a network interface came online/offline)
# uses awk to split the output of the ip monitor link on ': ' and then output the second column if it
# is not empty. In this case, the second column is the interface name.
# last we assign that to the variable `iface` with `while read`
# - then add our fixed ip address to that interface (so it will hopefully have 2 ip addresses).
# - if that interface does not have a dynamic ip, we ask dchp(cd) to assign a dynamic one in addition.
#    - this ensures whatever network we're on is happy because it can give us some IP address of its choosing.

ip monitor link | awk -W interactive -F ': ' '{if ($2) print $2;}' | while read -r iface; do
    # skip loopback interface
    if [[ "$iface" == "lo" ]]; then
        continue
    fi

    # echo "Waiting 10 seconds for interface ${iface} to settle:"
    # ip addr list "${iface}"

    # wait a delay to make sure the interface has gotten fully connected.
    sleep 20s

    # echo "Now checking interface ${iface}:"
    # ip addr list "${iface}"

    # check if the network interface is connected / "up"
    if ip addr list "${iface}" | grep 'state UP'; then
        # chek if have a dynamically (dchp) assigned IP address:
        if ip addr list "${iface}" | grep 'inet ' | grep 'dynamic'; then
            # check if we have our desired static IP address assigned to the interface as well
            if ip addr list "${iface}" | grep '192.168.0.88'; then
                # do nothing, we already have the static IP address we want
                continue
            else
                # otherwise we can add our fixed IP address to this interface.
                echo "Adding fixed IP 192.168.0.88/24 to ${iface}."
                sudo ip address add 192.168.0.88/24 dev "${iface}" broadcast +
            fi
        elif ip addr list "${iface}" | grep '192.168.0.88'; then
            echo "No dynamic IP address assigned to ${iface}. Adding a dynamic one."
            echo "Attempting to delete fixed ip 192.168.0.88 from ${iface}."
            sudo ip address del 192.168.0.88/24 dev "${iface}" broadcast + || true
            echo "Rebinding dchp assinged ip on ${iface}."
            sudo dhcpcd --rebind "${iface}"
        fi
    fi
done