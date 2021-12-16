#!/bin/bash
# Montors the Pi's network interfaces for changes (because a network interface came online/offline)
# uses awk to split the output of the ip monitor link on ': ' and then output the second column if it
# is not empty. In this case, the second column is the interface name.
# last we assign that to the variable iface with read and add the fixed ip address to that.
ip monitor link | awk -W interactive -F ': ' '{if ($2) print $2;}' | while read iface; do
    echo "Adding fixed IP 192.168.0.88 to ${iface}."
    sudo ip address add 192.168.0.88 dev ${iface}
done