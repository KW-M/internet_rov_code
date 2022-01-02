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
            # we must only add a second fixed (so not really static) ip address with the same first parts of the ip as the dynamic ip given by the phone, otherwise android will reject the new ip.
            # modified from: https://unix.stackexchange.com/questions/329083/how-to-replace-the-last-octet-of-a-valid-network-address-with-the-number-2
            current_dynamic_ip=$(ip addr list "${iface}" | grep 'inet ' | grep 'dynamic' | awk -W interactive -F ' ' '{if ($2) print $2;}')
            # get desired fixed ip like xxx.xxx.xxx.88 where 88 is the only octet different from the dynamic ip
            desired_fixed_ip=$(echo $current_dynamic_ip | awk -W interactive -F '.' '{print $1"."$2"."$3".88"}')

            # check if we have our desired fixed IP address assigned to the interface as well
            if ip addr list "${iface}" | grep "$desired_fixed_ip"; then
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
            if ip addr list "${iface}" | grep 'inet ' | grep ".88/24"; then
                current_fixed_ip=$(ip addr list "${iface}" | grep 'inet ' | grep ".88/24" | awk -W interactive -F ' ' '{if ($2) print $2;}')
                echo "Attempting to delete fixed ip ${current_fixed_ip} from ${iface}."
                sudo ip address del "${current_fixed_ip}" dev "${iface}" broadcast + || true
            fi

            echo "Addding dynamic ip by rebinding dchp assinged ip on ${iface}."
            sudo dhcpcd --rebind "${iface}"
        fi
    fi
done