#!/bin/bash
# Montors the Pi's network interfaces for changes (because a network interface came online/offline)
# uses awk to split the output of the ip monitor link on ': ' and then output the second column if it
# is not empty. In this case, the second column is the interface name.
# last we assign that to the variable `iface` with `while read`
# - then add our fixed ip address to that interface (so it will hopefully have 2 ip addresses).
# - if that interface does not have a dynamic ip, we ask dchp(cd) to assign a dynamic one in addition.
#    - this ensures whatever network we're on is happy because it can give us some IP address of its choosing.

ip monitor link | awk -W interactive -F ': ' '{if ($2) print $2;}' | while read -r iface; do
    # check if we don't have a dynamically (dchp) assigned IP address:
    if ip addr list "${iface}" | grep 'inet ' | grep 'dynamic'; then
        echo "Adding fixed IP 192.168.0.88/24 to ${iface}."
        sudo ip address add 192.168.0.88/24 dev "${iface}" broadcast +
    else
        echo "No dynamic IP address assigned to ${iface}. Assigning one now."
        echo "rebinding dchp assinged ip on ${iface}."
        sudo dhcpcd --rebind "${iface}"
    fi
done