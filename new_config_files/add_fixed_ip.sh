#!/bin/bash
# Note this MUST be run from a dhcpcd hook so that the environment vars are set.
# This script is setup to be run when the /etc/dhcpcd.enter-hook hook is called.

# case “${reason}” in BOUND|BOUND6|RENEW|RENEW6|REBIND|REBIND6|REBOOT|CARRIER|NETUP)
    echo "Adding fixed IP 192.168.0.88 to ${interface} because ${reason}. Is up:${if_up}" | systemd-cat -t rov_add_fixed_ip
    sudo ip address add 192.168.0.88 dev ${interface} | systemd-cat -t rov_add_fixed_ip
# ;;
# esac
