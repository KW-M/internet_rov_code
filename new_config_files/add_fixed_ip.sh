#!/bin/bash
# Montors the Pi's IP addresses for changes (because a network interface came online/offline)

ip mon addr | sed -nu -r 's/.*[[:digit:]]+:[[:space:]]+([^[:space:]]+).*/\1/p' | while read iface; do
    echo "Adding fixed IP 192.168.0.88 to ${interface}." | systemd-cat -t rov_add_fixed_ip
    sudo ip address add 192.168.0.88 dev ${interface} | systemd-cat -t rov_add_fixed_ip
done


# OLD version:
# Note this MUST be run from a dhcpcd hook so that the environment vars are set.
# This script is setup to be run when the /etc/dhcpcd.enter-hook hook is called.

# case “${reason}” in BOUND|BOUND6|RENEW|RENEW6|REBIND|REBIND6|REBOOT|CARRIER|NETUP)
    # echo "Adding fixed IP 192.168.0.88 to ${interface}. " | systemd-cat -t rov_add_fixed_ip
    # sudo ip address add 192.168.0.88 dev ${interface} | systemd-cat -t rov_add_fixed_ip
# ;;
# esac
