#!/bin/bash
# Note this MUST be run from a dhcpcd hook so that the environment vars are set.
# This script is setup to be run when the /etc/dhcpcd.enter-hook hook is called.
echo “================” >> /tmp/variables.txt
echo "Environment Variables" >> /tmp/variables.txt
printenv >> /tmp/variables.txt
echo “===============” >> /tmp/variables.txt
echo "Shell Variables" >> /tmp/variables.txt
set >> /tmp/variables.txt

case “${reason}” in BOUND|RENEW|REBIND|REBOOT)
    echo “nameserver 1.1.1.1” >> /etc/resolv.conf
    ip address add 192.168.0.88 dev ${interface} 2>&1 >> /etc/log/
;;
esac
