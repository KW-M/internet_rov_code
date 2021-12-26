#!/bin/bash

# ==========================================================================================
# Read out all usefull information from vcgencmd
# This could be converted into an proper telegraf plug-in
#
# Uses influx output format. Comment/uncomment what you want to measure.
#
# Combination of
# - https://github.com/robcowart/raspberry_pi_stats
# - https://github.com/fivesixzero/telegraf-pi-bash
#
# See https://www.raspberrypi.org/documentation/raspbian/applications/vcgencmd.md
# ==========================================================================================

host=$(cat /proc/sys/kernel/hostname)
data="vcgencmd,host=${host} "

# ---------------------------------------------------------------
#
# telegraf-pi-get-throttled.sh
#
# Get and parse RPi throttled state to produce single Grok-ready string.

### Data Acquisition
# Poll the VideoCore mailbox using vcgencmd to get the throttle state then use sed to grab just the hex digits
throttle_state_hex=$(/opt/vc/bin/vcgencmd get_throttled | sed -e 's/.*=0x\([0-9a-fA-F]*\)/\1/')

### Command Examples
## dc: Convert hex to dec or binary (useful for get_throttled output)
# Example: dc -e 16i2o50005p
# Syntax: dc -e <base_in>i<base_out>o<input>p
#   i = push base_in (previous var) to stack
#   o = push base_out (previous var) to stack
#   p = print conversion output with newline to stdout

get_base_conversion () {
  args=${1}i${2}o${3}p
  binary=$(dc -e $args)
  printf %020d $binary
}

throttle_state_bin=$(get_base_conversion 16 2 $throttle_state_hex)

binpattern="[0-1]{20}"
if [[ $throttle_state_bin =~ $binpattern ]]; then
## Reference: get_throttled bit flags
  # https://github.com/raspberrypi/firmware/commit/404dfef3b364b4533f70659eafdcefa3b68cd7ae#commitcomment-31620480
  #
  # NOTE: These ref numbers are reversed compared to vcencmd output.
  #
  # Since Boot          Now
  #  |                   |
  # 0101 0000 0000 0000 0101‬
  # ||||                ||||_ [19] throttled
  # ||||                |||_ [18] arm frequency capped
  # ||||                ||_ [17] under-voltage
  # ||||                |_ [16] soft temperature capped
  # ||||_ [3] throttling has occurred since last reboot
  # |||_ [2] arm frequency capped since last reboot
  # ||_ [1] under-voltage has occurred since last reboot
  # |_ [0] soft temperature reached since last reboot

  strb=${throttle_state_bin:0:1}
  uvb=${throttle_state_bin:1:1}
  afcb=${throttle_state_bin:2:1}
  trb=${throttle_state_bin:3:1}
  str=${throttle_state_bin:16:1}
  uv=${throttle_state_bin:17:1}
  afc=${throttle_state_bin:18:1}
  tr=${throttle_state_bin:19:1}

  # Note: first field, do not start with a ,
  data+="under_volted=${uv:-0}i,under_volted_boot=${uvb:-0}i,arm_freq_capped=${afc:-0}i,arm_freq_capped_boot=${afcb:-0}i,throttled=${tr:-0}i,throttled_boot=${trb:-0}i,soft_temp_limit=${str:-0}i,soft_temp_limit_boot=${strb:-0}i"
fi
# ---------------------------------------------------------------

# SOC temp
soc_temp=$(/opt/vc/bin/vcgencmd measure_temp | sed -e "s/temp=//" -e "s/'C//")
data+=",soc_temp=${soc_temp}"

# Clock speeds
arm_f=$(/opt/vc/bin/vcgencmd measure_clock arm | sed -e "s/^.*=//")
data+=",arm_freq=${arm_f}i"
core_f=$(/opt/vc/bin/vcgencmd measure_clock core | sed -e "s/^.*=//")
data+=",core_freq=${core_f}i"
#h264_f=$(/opt/vc/bin/vcgencmd measure_clock h264 | sed -e "s/^.*=//")
#data+=",h264_freq=${h264_f}i"
#isp_f=$(/opt/vc/bin/vcgencmd measure_clock isp | sed -e "s/^.*=//")
#data+=",isp_freq=${isp_f}i"
#v3d_f=$(/opt/vc/bin/vcgencmd measure_clock v3d | sed -e "s/^.*=//")
#data+=",v3d_freq=${v3d_f}i"
uart_f=$(/opt/vc/bin/vcgencmd measure_clock uart | sed -e "s/^.*=//")
data+=",uart_freq=${uart_f}i"
#pwm_f=$(/opt/vc/bin/vcgencmd measure_clock pwm | sed -e "s/^.*=//")
#data+=",pwm_freq=${pwm_f}i"
#emmc_f=$(/opt/vc/bin/vcgencmd measure_clock emmc | sed -e "s/^.*=//")
#data+=",emmc_freq=${emmc_f}i"
#pixel_f=$(/opt/vc/bin/vcgencmd measure_clock pixel | sed -e "s/^.*=//")
#data+=",pixel_freq=${pixel_f}i"
#vec_f=$(/opt/vc/bin/vcgencmd measure_clock vec | sed -e "s/^.*=//")
#data+=",vec_freq=${vec_f}i"
#hdmi_f=$(/opt/vc/bin/vcgencmd measure_clock hdmi | sed -e "s/^.*=//")
#data+=",hdmi_freq=${hdmi_f}i"
#dpi_f=$(/opt/vc/bin/vcgencmd measure_clock dpi | sed -e "s/^.*=//")
#data+=",dpi_freq=${dpi_f}i"

# Voltages
core_v=$(/opt/vc/bin/vcgencmd measure_volts core | sed -e "s/volt=//" -e "s/0*V//")
data+=",core_volt=${core_v}"
#sdram_c_v=$(/opt/vc/bin/vcgencmd measure_volts sdram_c | sed -e "s/volt=//" -e "s/0*V//")
#data+=",sdram_c_volt=${sdram_c_v}"
#sdram_i_v=$(/opt/vc/bin/vcgencmd measure_volts sdram_i | sed -e "s/volt=//" -e "s/0*V//")
#data+=",sdram_i_volt=${sdram_i_v}"
#sdram_p_v=$(/opt/vc/bin/vcgencmd measure_volts sdram_p | sed -e "s/volt=//" -e "s/0*V//")
#data+=",sdram_p_volt=${sdram_p_v}"

# Memory
# Note: do not use get_mem arm on RPi 4 (> 1GB)
#arm_m=$(($(/opt/vc/bin/vcgencmd get_mem arm | sed -e "s/arm=//" -e "s/M//")*1000000))
#data+=",arm_mem=${arm_m}i"
#gpu_m=$(($(/opt/vc/bin/vcgencmd get_mem gpu | sed -e "s/gpu=//" -e "s/M//")*1000000))
#data+=",gpu_mem=${gpu_m}i"
#malloc_total_m=$(($(/opt/vc/bin/vcgencmd get_mem malloc_total | sed -e "s/malloc_total=//" -e "s/M//")*1000000))
#data+=",malloc_total_mem=${malloc_total_m}i"
#malloc_m=$(($(/opt/vc/bin/vcgencmd get_mem malloc | sed -e "s/malloc=//" -e "s/M//")*1000000))
#data+=",malloc_mem=${malloc_m}i"
#reloc_total_m=$(($(/opt/vc/bin/vcgencmd get_mem reloc_total | sed -e "s/reloc_total=//" -e "s/M//")*1000000))
#data+=",reloc_total_mem=${reloc_total_m}i"
#reloc_m=$(($(/opt/vc/bin/vcgencmd get_mem reloc | sed -e "s/reloc=//" -e "s/M//")*1000000))
#data+=",reloc_men=${reloc_m}i"

# Config
# Note: this data is static; there are more options available
#config_arm_f=$(($(/opt/vc/bin/vcgencmd get_config arm_freq | sed -e "s/arm_freq=//")*1000000))
#data+=",config_arm_freq=${config_arm_f}i"
#config_core_f=$(($(/opt/vc/bin/vcgencmd get_config core_freq | sed -e "s/core_freq=//")*1000000))
#data+=",config_core_freq=${config_core_f}i"
#config_gpu_f=$(($(/opt/vc/bin/vcgencmd get_config gpu_freq | sed -e "s/gpu_freq=//")*1000000))
#data+=",config_gpu_freq=${config_gpu_f}i"

# Out Of Memory events in VC4 memory space
# Note: lifetime oom requried is skipped
oom_c=$(/opt/vc/bin/vcgencmd mem_oom | grep "oom events" | sed -e "s/^.*: //")
data+=",oom_count=${oom_c}i"
oom_t=$(/opt/vc/bin/vcgencmd mem_oom | grep "total time" | sed -e "s/^.*: //" -e "s/ ms//")
data+=",oom_total_time=${oom_t}i"
oom_max_t=$(/opt/vc/bin/vcgencmd mem_oom | grep "max time" | sed -e "s/^.*: //" -e "s/ ms//")
data+=",oom_max_time=${oom_max_t}i"

# Relocatable memory allocator on the VC4
#mem_reloc_alloc_fail_c=$(/opt/vc/bin/vcgencmd mem_reloc_stats | grep "alloc failures" | sed -e "s/^.*:[^0-9]*//")
#data+=",mem_reloc_alloc_fail_c=${mem_reloc_alloc_fail_c}i"
#mem_reloc_compact_c=$(/opt/vc/bin/vcgencmd mem_reloc_stats | grep "compactions" | sed -e "s/^.*:[^0-9]*//")
#data+=",mem_reloc_compact_c=${mem_reloc_compact_c}i"
#mem_reloc_leg_blk_fail_c=$(/opt/vc/bin/vcgencmd mem_reloc_stats | grep "legacy block fails" | sed -e "s/^.*:[^0-9]*//")
#data+=",mem_reloc_leg_blk_fail_c=${mem_reloc_leg_blk_fail_c}i"

# Ring oscillator
# Indicates how slow/fast the silicone the this particalar RPi is.
# https://www.raspberrypi.org/forums/viewtopic.php?p=582078
#osc_output=$(/opt/vc/bin/vcgencmd read_ring_osc)

time_stamp=$(date +%s%N)
data+=" ${time_stamp}"
echo "${data}"