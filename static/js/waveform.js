/**
 * DIGITAL WAVEFORM RENDERER ENGINE (SVG GTKWAVE ALTERNATIVE)
 */

function renderWaveformSVG(containerId, waveHistory, inputDefs, outputDefs) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!waveHistory || waveHistory.length < 2) {
        container.innerHTML = `<div class="waveform-placeholder">Đang chờ tín hiệu mô phỏng (Hãy chạy hoặc tương tác công tắc)...</div>`;
        return;
    }

    const allSignals = [];
    inputDefs.forEach(i => allSignals.push({ id: i.id, label: i.label, isInput: true }));
    outputDefs.forEach(o => allSignals.push({ id: o.id, label: o.label, isInput: false }));

    const numSamples = waveHistory.length;
    const svgWidth = Math.max(600, container.clientWidth || 600);
    const stepX = (svgWidth - 120) / (numSamples - 1);

    let html = `<div class="waveform-box">`;
    html += `<div class="waveform-header"><span>Tên Tín Hiệu</span><span>Dạng Sóng Mô Phỏng (GTKWave View)</span></div>`;

    allSignals.forEach(sig => {
        let pathD = "";
        waveHistory.forEach((sample, idx) => {
            const x = 100 + idx * stepX;
            const val = sig.isInput ? (sample.inputs[sig.id] ? 1 : 0) : (sample.outputs[sig.id] ? 1 : 0);
            const y = val === 1 ? 5 : 25; // 1 = top, 0 = bottom

            if (idx === 0) {
                pathD += `M ${x} ${y}`;
            } else {
                const prevVal = sig.isInput ? (waveHistory[idx-1].inputs[sig.id] ? 1 : 0) : (waveHistory[idx-1].outputs[sig.id] ? 1 : 0);
                const prevY = prevVal === 1 ? 5 : 25;
                if (prevY !== y) {
                    pathD += ` L ${x} ${prevY} L ${x} ${y}`; // Step transition
                } else {
                    pathD += ` L ${x} ${y}`;
                }
            }
        });

        const colorClass = sig.isInput ? "#3b82f6" : "#22c55e";

        html += `
            <div class="wave-row">
                <div class="wave-label" style="color: ${colorClass}">
                    <span>${sig.isInput ? '▶ IN' : '◀ OUT'}</span> ${sig.label}
                </div>
                <div class="wave-canvas">
                    <svg viewBox="0 0 ${svgWidth} 30" preserveAspectRatio="none">
                        <path d="${pathD}" fill="none" stroke="${colorClass}" stroke-width="2" />
                    </svg>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}
