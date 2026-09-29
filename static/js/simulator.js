/**
 * IN-BROWSER VERILOG LOGIC SIMULATOR & BOARD DRIVER
 */

class InBrowserVerilogSimulator {
    constructor() {
        this.clockTimer = null;
        this.tickCount = 0;
        this.waveHistory = [];
        this.prevMem = {};
    }

    reset() {
        this.stopClock();
        this.tickCount = 0;
        this.waveHistory = [];
        this.prevMem = {};
    }

    startClock(onTickCallback, intervalMs = 150) {
        this.stopClock();
        this.clockTimer = setInterval(() => {
            this.tickCount++;
            if (onTickCallback) onTickCallback(this.tickCount);
        }, intervalMs);
    }

    stopClock() {
        if (this.clockTimer) {
            clearInterval(this.clockTimer);
            this.clockTimer = null;
        }
    }

    evaluateLab(exercise, userInputs) {
        try {
            if (!exercise || !exercise.evalFn) {
                return { success: true, outputs: {}, waveSample: [] };
            }

            // Environment context provided to evalFn string
            const env = {
                clkTick: this.tickCount,
                prev: this.prevMem
            };

            // Dynamically execute the safe evalFn for the lab
            const fn = new Function('inputs', 'env', exercise.evalFn);
            const rawOutputs = fn(userInputs, env) || {};

            // Save state memory
            this.prevMem = { ...rawOutputs, ...userInputs };

            // Record waveform sample
            const sample = {
                tick: this.tickCount,
                inputs: { ...userInputs },
                outputs: { ...rawOutputs }
            };

            this.waveHistory.push(sample);
            if (this.waveHistory.length > 50) {
                this.waveHistory.shift(); // Keep last 50 samples
            }

            return {
                success: true,
                outputs: rawOutputs,
                waveHistory: this.waveHistory
            };
        } catch (err) {
            console.error("Simulation Eval Error:", err);
            return {
                success: False,
                error: err.message,
                outputs: {}
            };
        }
    }
}

const simulatorEngine = new InBrowserVerilogSimulator();
