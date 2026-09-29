/**
 * TANG NANO 9K PINOUT DATABASE & CST GENERATOR
 */

const TANG_NANO_9K_PINS = [
    { name: "clk", pin: "52", type: "LVCMOS33", mode: "PULL_MODE=UP", desc: "System Clock 27MHz Onboard" },
    { name: "btn1 (SW1)", pin: "3", type: "LVCMOS18", mode: "PULL_MODE=UP", desc: "User Key SW1 (Active-Low)" },
    { name: "btn2 (SW2)", pin: "4", type: "LVCMOS18", mode: "PULL_MODE=UP", desc: "User Key SW2 (Active-Low)" },
    { name: "led[0]", pin: "10", type: "LVCMOS18", mode: "DRIVE=8", desc: "LED 0 Onboard (Active-Low)" },
    { name: "led[1]", pin: "11", type: "LVCMOS18", mode: "DRIVE=8", desc: "LED 1 Onboard (Active-Low)" },
    { name: "led[2]", pin: "13", type: "LVCMOS18", mode: "DRIVE=8", desc: "LED 2 Onboard (Active-Low)" },
    { name: "led[3]", pin: "14", type: "LVCMOS18", mode: "DRIVE=8", desc: "LED 3 Onboard (Active-Low)" },
    { name: "led[4]", pin: "15", type: "LVCMOS18", mode: "DRIVE=8", desc: "LED 4 Onboard (Active-Low)" },
    { name: "led[5]", pin: "16", type: "LVCMOS18", mode: "DRIVE=8", desc: "LED 5 Onboard (Active-Low)" },
    { name: "uart_tx", pin: "17", type: "LVCMOS33", mode: "DRIVE=8", desc: "UART Transmit (TXD)" },
    { name: "uart_rx", pin: "18", type: "LVCMOS33", mode: "PULL_MODE=UP", desc: "UART Receive (RXD)" },
    { name: "hdmi_clk_p", pin: "69", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Clock Positive" },
    { name: "hdmi_clk_n", pin: "68", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Clock Negative" },
    { name: "hdmi_d0_p", pin: "71", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Data 0 Positive" },
    { name: "hdmi_d0_n", pin: "70", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Data 0 Negative" },
    { name: "hdmi_d1_p", pin: "73", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Data 1 Positive" },
    { name: "hdmi_d1_n", pin: "72", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Data 1 Negative" },
    { name: "hdmi_d2_p", pin: "75", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Data 2 Positive" },
    { name: "hdmi_d2_n", pin: "74", type: "LVCMOS33", mode: "DRIVE=8", desc: "HDMI Data 2 Negative" }
];

function generateCstContent(signalMap) {
    let lines = ["// Physical Constraints File (.cst) for Sipeed Tang Nano 9K", "// Device: GW1NR-LV9QN88PC6/I5", ""];
    for (const [signal, config] of Object.entries(signalMap)) {
        lines.push(`IO_LOC "${signal}" ${config.pin}; IO_PORT "${signal}" IO_TYPE=${config.type || 'LVCMOS18'} ${config.mode || ''};`);
    }
    return lines.join("\n");
}
