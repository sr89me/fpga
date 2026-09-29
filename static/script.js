let editor;

document.addEventListener("DOMContentLoaded", function() {
    const codeArea = document.getElementById("code-editor");
    if (codeArea) {
        editor = CodeMirror.fromTextArea(codeArea, {
            mode: "verilog",
            lineNumbers: true,
            theme: "default"
        });
    }
});

function simulateCode() {
    const code = editor.getValue();
    const outputConsole = document.getElementById("output-console");
    const exId = document.getElementById("code-editor").getAttribute("data-ex-id");
    const btnWaveform = document.getElementById("btn-waveform");
    
    outputConsole.innerHTML = "Đang kết nối tới server...\nĐang biên dịch và mô phỏng bằng Icarus Verilog...\n";
    btnWaveform.style.display = "none";
    
    fetch(`/simulate/${exId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'code=' + encodeURIComponent(code)
    })
    .then(response => response.json())
    .then(data => {
        outputConsole.innerHTML = data.output;
        if (data.status === "success" && data.has_vcd) {
            btnWaveform.style.display = "inline-block";
        }
    })
    .catch(error => {
        outputConsole.innerHTML = "Lỗi kết nối tới server!";
    });
}

function openWaveform() {
    fetch('/open_waveform', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "error") {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error opening waveform:", error);
    });
}

function exportPDF() {
    const element = document.getElementById('report-content');
    const header = document.querySelector('.report-header');
    
    // Show header for PDF
    header.style.display = 'block';
    
    // Replace textarea with div for better PDF rendering of notes
    const notesArea = document.getElementById('notes');
    const notesContent = notesArea.value;
    const notesDiv = document.createElement('div');
    notesDiv.style.border = "1px solid #ddd";
    notesDiv.style.padding = "10px";
    notesDiv.style.minHeight = "100px";
    notesDiv.style.whiteSpace = "pre-wrap";
    notesDiv.innerText = notesContent || "(Không có ghi chú)";
    notesArea.style.display = 'none';
    notesArea.parentNode.insertBefore(notesDiv, notesArea);

    // Replace CodeMirror with pre for PDF
    const codeContent = editor.getValue();
    const codeMirrorWrap = document.querySelector('.CodeMirror');
    const tempPre = document.createElement('pre');
    tempPre.style.whiteSpace = 'pre-wrap';
    tempPre.style.background = '#f4f4f4';
    tempPre.style.padding = '15px';
    tempPre.style.border = '1px solid #ccc';
    tempPre.style.fontFamily = 'monospace';
    tempPre.textContent = codeContent;
    
    codeMirrorWrap.style.display = 'none';
    codeMirrorWrap.parentNode.insertBefore(tempPre, codeMirrorWrap);

    const opt = {
        margin:       10,
        filename:     'BaoCao_ThucHanh_FPGA.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        // Restore layout after saving
        header.style.display = 'none';
        
        notesArea.style.display = 'block';
        notesDiv.remove();
        
        codeMirrorWrap.style.display = 'block';
        tempPre.remove();
    });
}
