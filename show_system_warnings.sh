#!/bin/bash

# ==========================================================================================
# Read out all usefull information from vcgencmd about possible system problems
#
# Comment/uncomment what you want to measure.
#
# Combination of
# - https://github.com/robcowart/raspberry_pi_stats
# - https://github.com/fivesixzero/telegraf-pi-bash
#
# See https://www.raspberrypi.org/documentation/raspbian/applications/vcgencmd.md
# ==========================================================================================

# ---------------------------------------------------------------
# Get and parse RPi throttled state to output any wanings on each line.

### Data Acquisition
# Poll the VideoCore mailbox using vcgencmd to get the throttle state then use sed to grab just the hex digits
throttle_state_hex=$(vcgencmd get_throttled | sed -e 's/.*=0x\([0-9a-fA-F]*\)/\1/')

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

if (( "${uv:-0}" > 0 )); then echo "under_volted=${uv:-0}"; fi
if (( "${uvb:-0}" > 0 )); then echo "under_volted_since_boot=${uvb:-0}"; fi
if (( "${afc:-0}" > 0 )); then echo "arm_freq_capped=${afc:-0}"; fi
if (( "${afcb:-0}" > 0 )); then echo "arm_freq_capped_since_boot=${afcb:-0}"; fi
if (( "${tr:-0}" > 0 )); then echo "throttled=${tr:-0}"; fi
if (( "${trb:-0}" > 0 )); then echo "throttled_since_boot=${trb:-0}"; fi
if (( "${str:-0}" > 0 )); then echo "soft_temp_limit=${str:-0}"; fi
if (( "${strb:-0}" > 0 )); then echo "soft_temp_limit_since_boot=${strb:-0}"; fi

fi
# ---------------------------------------------------------------

# SOC temp
# soc_temp=$(vcgencmd measure_temp | sed -e "s/temp=//" -e "s/'C//")
# if (( soc_temp}" > 0 )); then echo "soc_temp=${soc_temp}"; fi


# Clock speeds
# arm_f=$(vcgencmd measure_clock arm | sed -e "s/^.*=//")
# if (( arm_f}" > 0 )); then echo "arm_freq=${arm_f}"; fi

# core_f=$(vcgencmd measure_clock core | sed -e "s/^.*=//")
# if (( core_f}" > 0 )); then echo "core_freq=${core_f}"; fi

#h264_f=$(vcgencmd measure_clock h264 | sed -e "s/^.*=//")
#if (( h264_f}" > 0 )); then echo "h264_freq=${h264_f}"; fi

#isp_f=$(vcgencmd measure_clock isp | sed -e "s/^.*=//")
#if (( isp_f}" > 0 )); then echo "isp_freq=${isp_f}"; fi

#v3d_f=$(vcgencmd measure_clock v3d | sed -e "s/^.*=//")
#if (( v3d_f}" > 0 )); then echo "v3d_freq=${v3d_f}"; fi

# uart_f=$(vcgencmd measure_clock uart | sed -e "s/^.*=//")
# if (( uart_f}" > 0 )); then echo "uart_freq=${uart_f}"; fi

#pwm_f=$(vcgencmd measure_clock pwm | sed -e "s/^.*=//")
#if (( pwm_f}" > 0 )); then echo "pwm_freq=${pwm_f}"; fi

#emmc_f=$(vcgencmd measure_clock emmc | sed -e "s/^.*=//")
#if (( emmc_f}" > 0 )); then echo "emmc_freq=${emmc_f}"; fi

#pixel_f=$(vcgencmd measure_clock pixel | sed -e "s/^.*=//")
#if (( pixel_f}" > 0 )); then echo "pixel_freq=${pixel_f}"; fi

#vec_f=$(vcgencmd measure_clock vec | sed -e "s/^.*=//")
#if (( vec_f}" > 0 )); then echo "vec_freq=${vec_f}"; fi

#hdmi_f=$(vcgencmd measure_clock hdmi | sed -e "s/^.*=//")
#if (( hdmi_f}" > 0 )); then echo "hdmi_freq=${hdmi_f}"; fi

#dpi_f=$(vcgencmd measure_clock dpi | sed -e "s/^.*=//")
#if (( dpi_f}" > 0 )); then echo "dpi_freq=${dpi_f}"; fi


# --- Voltages ---
# ---- ( these will all be much lower than the supply volatage and should remain constant, because they messure the voltage inside the individual chips )
# core_v=$(vcgencmd measure_volts core | sed -e "s/volt=//" -e "s/0*V//")
# if (( core_v}" > 0 )); then echo "core_volt=${core_v}"; fi

#sdram_c_v=$(vcgencmd measure_volts sdram_c | sed -e "s/volt=//" -e "s/0*V//")
#if (( sdram_c_v}" > 0 )); then echo "sdram_c_volt=${sdram_c_v}"; fi

#sdram_i_v=$(vcgencmd measure_volts sdram_i | sed -e "s/volt=//" -e "s/0*V//")
#if (( sdram_i_v}" > 0 )); then echo "sdram_i_volt=${sdram_i_v}"; fi

#sdram_p_v=$(vcgencmd measure_volts sdram_p | sed -e "s/volt=//" -e "s/0*V//")
#if (( sdram_p_v}" > 0 )); then echo "sdram_p_volt=${sdram_p_v}"; fi


# Memory
# Note: do not use get_mem arm on RPi 4 (> 1GB)
# arm_m=$(($(vcgencmd get_mem arm | sed -e "s/arm=//" -e "s/M//")*1000000))
# echo "arm_mem=${arm_m}";

# gpu_m=$(($(vcgencmd get_mem gpu | sed -e "s/gpu=//" -e "s/M//")*1000000))
# echo "gpu_mem=${gpu_m}";

#malloc_total_m=$(($(vcgencmd get_mem malloc_total | sed -e "s/malloc_total=//" -e "s/M//")*1000000))
#if (( malloc_total_m}" > 0 )); then echo "malloc_total_mem=${malloc_total_m}"; fi

#malloc_m=$(($(vcgencmd get_mem malloc | sed -e "s/malloc=//" -e "s/M//")*1000000))
#if (( malloc_m}" > 0 )); then echo "malloc_mem=${malloc_m}"; fi

#reloc_total_m=$(($(vcgencmd get_mem reloc_total | sed -e "s/reloc_total=//" -e "s/M//")*1000000))
#if (( reloc_total_m}" > 0 )); then echo "reloc_total_mem=${reloc_total_m}"; fi

#reloc_m=$(($(vcgencmd get_mem reloc | sed -e "s/reloc=//" -e "s/M//")*1000000))
#if (( reloc_m}" > 0 )); then echo "reloc_men=${reloc_m}"; fi


# Config
# Note: this data is static; there are more options available
#config_arm_f=$(($(vcgencmd get_config arm_freq | sed -e "s/arm_freq=//")*1000000))
#if (( config_arm_f}" > 0 )); then echo "config_arm_freq=${config_arm_f}"; fi

#config_core_f=$(($(vcgencmd get_config core_freq | sed -e "s/core_freq=//")*1000000))
#if (( config_core_f}" > 0 )); then echo "config_core_freq=${config_core_f}"; fi

#config_gpu_f=$(($(vcgencmd get_config gpu_freq | sed -e "s/gpu_freq=//")*1000000))
#if (( config_gpu_f}" > 0 )); then echo "config_gpu_freq=${config_gpu_f}"; fi


# Out Of Memory events in VC4 memory space
# Note: lifetime oom requried is skipped
oom_c=$(vcgencmd mem_oom | grep "oom events" | sed -e "s/^.*: //")
if (( oom_c > 0 )); then echo "Out of memory event count: ${oom_c}"; fi

oom_t=$(vcgencmd mem_oom | grep "total time" | sed -e "s/^.*: //" -e "s/ ms//")
if (( oom_t > 0 )); then echo "Out of memory total time: ${oom_t}ms"; fi

oom_max_t=$(vcgencmd mem_oom | grep "max time" | sed -e "s/^.*: //" -e "s/ ms//")
if (( oom_max_t > 0 )); then echo "Out of memory event max time: ${oom_max_t}ms"; fi


# Relocatable memory allocator on the VC4
#mem_reloc_alloc_fail_c=$(vcgencmd mem_reloc_stats | grep "alloc failures" | sed -e "s/^.*:[^0-9]*//")
#if (( mem_reloc_alloc_fail_c}" > 0 )); then echo "mem_reloc_alloc_fail_c=${mem_reloc_alloc_fail_c}"; fi

#mem_reloc_compact_c=$(vcgencmd mem_reloc_stats | grep "compactions" | sed -e "s/^.*:[^0-9]*//")
#if (( mem_reloc_compact_c}" > 0 )); then echo "mem_reloc_compact_c=${mem_reloc_compact_c}"; fi

#mem_reloc_leg_blk_fail_c=$(vcgencmd mem_reloc_stats | grep "legacy block fails" | sed -e "s/^.*:[^0-9]*//")
#if (( mem_reloc_leg_blk_fail_c}" > 0 )); then echo "mem_reloc_leg_blk_fail_c=${mem_reloc_leg_blk_fail_c}"; fi


# Ring oscillator
# Indicates how slow/fast the silicone the this particalar RPi is.
# https://www.raspberrypi.org/forums/viewtopic.php?p=582078
#osc_output=$(vcgencmd read_ring_osc)


# Raspi A defaults: vcgencmd,host=raspberrypi under_volted=0i,under_volted_boot=0i,arm_freq_capped=0i,arm_freq_capped_boot=0i,throttled=0i,throttled_boot=0i,soft_temp_limit=0i,soft_temp_limit_boot=0i,soc_temp=52.6,arm_freq=1400000000i,core_freq=400000000i,uart_freq=47999000i,core_volt=1.3438,oom_count=0i,oom_total_time=0i,oom_max_time=0i
