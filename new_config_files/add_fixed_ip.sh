#!/bin/bash
# Montors the Pi's network interfaces for changes (because a network interface came online/offline)
# uses awk to split the output of the ip monitor link on ': ' and then output the second column if it
# is not empty. In this case, the second column is the interface name.
# last we assign that to the variable iface with read and add the fixed ip address to that.
ip monitor link | awk -W interactive -F ': ' '{if ($2) print $2;}' | while read iface; do
    echo "Adding fixed IP 192.168.0.88 to ${interface}."
    sudo ip address add 192.168.0.88 dev ${interface}
done


# OLD version:
# Note this MUST be run from a dhcpcd hook so that the environment vars are set.
# This script is setup to be run when the /etc/dhcpcd.enter-hook hook is called.

# case “${reason}” in BOUND|BOUND6|RENEW|RENEW6|REBIND|REBIND6|REBOOT|CARRIER|NETUP)
    # echo "Adding fixed IP 192.168.0.88 to ${interface}. " | systemd-cat -t rov_add_fixed_ip
    # sudo ip address add 192.168.0.88 dev ${interface} | systemd-cat -t rov_add_fixed_ip
# ;;
# esac
