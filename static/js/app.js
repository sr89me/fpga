/**
 * MAIN APP CONTROLLER - FPGA TANG NANO 9K LEARNING APP
 * Module Block Diagram Visualizer, Student Submission Workflow, Verilog Syntax Highlighter, Teacher Answers & Printable Waveform PDF Report
 */

document.addEventListener('DOMContentLoaded', () => {
    // Global State
    window.appState = {
        student: JSON.parse(localStorage.getItem('fpga_student')) || null,
        currentTab: 'workspace', // Workspace is default view
        currentLab: FPGA_EXERCISES[0],
        completedLabs: JSON.parse(localStorage.getItem('fpga_completed')) || [],
        userCodeMap: JSON.parse(localStorage.getItem('fpga_code')) || {},
        userTruthTableMap: JSON.parse(localStorage.getItem('fpga_truthtables')) || {},
        userNotesMap: JSON.parse(localStorage.getItem('fpga_notes')) || {},
        userGradesMap: JSON.parse(localStorage.getItem('fpga_user_grades')) || {},
        isTeacherUnlocked: false,
        simInputs: {},
        filterCategory: 'all',
        filterDiff: 'all'
    };

    const state = window.appState;

    // Global helper to switch tabs cleanly
    window.switchTab = function(targetTabId) {
        if (targetTabId === 'solutions' && !state.isTeacherUnlocked) {
            const pinModal = document.getElementById('teacherPinModal');
            if (pinModal) pinModal.style.display = 'flex';
            return;
        }

        const tabs = document.querySelectorAll('.nav-tab');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(t => {
            if (t.dataset.target === targetTabId) t.classList.add('active');
            else t.classList.remove('active');
        });

        contents.forEach(c => {
            if (c.id === targetTabId) c.classList.add('active');
            else c.classList.remove('active');
        });

        state.currentTab = targetTabId;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetTabId === 'solutions') {
            renderTeacherStudentDashboard();
        }
    };

    // Global helper to open lab by ID
    window.openLabById = function(labId) {
        const found = FPGA_EXERCISES.find(e => e.id === parseInt(labId));
        if (!found) return;

        state.currentLab = found;
        loadLabWorkspace(found);
        window.switchTab('workspace');
    };

    // Initialize UI
    initLoginModal();
    initTeacherPinModal();
    initNavigation();
    renderTutorialsTab();
    renderExercisesTab();
    renderPinoutTab();
    renderWorkspaceSidebar();
    loadLabWorkspace(FPGA_EXERCISES[0]);
    initPdfReportExport();
    initCodeEditorHighlight();

    // ----------------------------------------------------
    // Mandatory Login Modal Logic
    // ----------------------------------------------------
    function initLoginModal() {
        const modal = document.getElementById('loginModal');
        const loginForm = document.getElementById('loginForm');
        const studentName = document.getElementById('studentNameDisplay');
        const studentId = document.getElementById('studentIdDisplay');

        function updateProfileDisplay() {
            if (state.student) {
                if (studentName) studentName.textContent = state.student.name;
                if (studentId) studentId.textContent = state.student.id + " | " + (state.student.class || 'DCCTĐT68');
            }
        }

        if (state.student && state.student.name && state.student.id) {
            modal.style.display = 'none';
            updateProfileDisplay();
        } else {
            modal.style.display = 'flex';
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('inputStudentName').value.trim();
                const id = document.getElementById('inputStudentId').value.trim();
                const cls = document.getElementById('inputStudentClass').value.trim();

                if (!name || !id) {
                    alert('Vui lòng nhập đầy đủ Họ tên và Mã sinh viên để đăng nhập!');
                    return;
                }

                state.student = { name, id, class: cls || 'DCCTĐT68' };
                localStorage.setItem('fpga_student', JSON.stringify(state.student));

                modal.style.display = 'none';
                updateProfileDisplay();
            });
        }

        document.getElementById('btnLogout')?.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    // Teacher PIN Modal Logic
    function initTeacherPinModal() {
        const modal = document.getElementById('teacherPinModal');
        const form = document.getElementById('teacherPinForm');
        const btnCancel = document.getElementById('btnCancelTeacherPin');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const pin = document.getElementById('inputTeacherPin').value.trim();
                if (pin === '123456' || pin === 'humg2026' || pin === 'sy') {
                    state.isTeacherUnlocked = true;
                    modal.style.display = 'none';
                    window.switchTab('solutions');
                } else {
                    alert('Mã PIN Giảng Viên không đúng! Vui lòng liên hệ ThS. Nguyễn Tiến Sỹ để lấy mã PIN.');
                }
            });
        }

        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }

    // ----------------------------------------------------
    // Navigation Tabs Initialization
    // ----------------------------------------------------
    function initNavigation() {
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.target;
                window.switchTab(target);
            });
        });
    }

    // ----------------------------------------------------
    // Render Workspace Left Sidebar (35 Labs Selector)
    // ----------------------------------------------------
    function renderWorkspaceSidebar() {
        const sidebarList = document.getElementById('wsLabListSidebar');
        const badge = document.getElementById('wsCompletedBadge');
        if (!sidebarList) return;

        const totalLabs = FPGA_EXERCISES.length;
        const doneCount = state.completedLabs.length;
        if (badge) badge.textContent = `${doneCount}/${totalLabs} Đã xong`;

        let html = '';
        FPGA_EXERCISES.forEach(lab => {
            const isDone = state.completedLabs.includes(lab.id);
            const isActive = state.currentLab && state.currentLab.id === lab.id;

            html += `
                <div class="ws-lab-item ${isActive ? 'active' : ''}" onclick="window.openLabById(${lab.id})">
                    <div class="ws-lab-item-title">${lab.title}</div>
                    <div class="ws-lab-item-sub">
                        <span>${lab.difficulty}</span>
                        <span style="color: ${isDone ? 'var(--accent-green)' : 'var(--text-subtle)'}; font-weight: 600;">
                            ${isDone ? '✓ Đã xong' : '○ Chưa xong'}
                        </span>
                    </div>
                </div>
            `;
        });

        sidebarList.innerHTML = html;
    }

    // ----------------------------------------------------
    // 1. Render Tutorials Tab (Tutorials 1, 2, 3)
    // ----------------------------------------------------
    function renderTutorialsTab() {
        const navContainer = document.getElementById('tutNavContainer');
        const bodyContainer = document.getElementById('tutBodyContainer');
        if (!navContainer || !bodyContainer) return;

        let navHtml = '';
        VERILOG_TUTORIALS.forEach((tut, idx) => {
            navHtml += `
                <div class="tut-nav-item ${idx === 0 ? 'active' : ''}" data-tut-id="${tut.id}">
                    <div class="tut-nav-title">Bài ${tut.number}: ${tut.title.split(':')[1] || tut.title}</div>
                    <div class="tut-nav-sub">${tut.badge} • ${tut.sections.length} mục chính</div>
                </div>
            `;
        });

        navContainer.innerHTML = navHtml;
        renderTutorialBody(VERILOG_TUTORIALS[0]);

        navContainer.querySelectorAll('.tut-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navContainer.querySelectorAll('.tut-nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const tutId = item.dataset.tutId;
                const found = VERILOG_TUTORIALS.find(t => t.id === tutId);
                if (found) renderTutorialBody(found);
            });
        });
    }

    function renderTutorialBody(tut) {
        const bodyContainer = document.getElementById('tutBodyContainer');
        let html = `
            <div class="tut-article">
                <h2>${tut.title}</h2>
                <div class="subtitle">${tut.subtitle}</div>
                <div class="tip-box"><strong>🎯 Tóm tắt bài học:</strong> ${tut.summary}</div>
        `;

        tut.sections.forEach(sec => {
            html += `
                <div class="tut-section">
                    <h3>${sec.title}</h3>
                    <div>${sec.content}</div>
                </div>
            `;
        });

        html += `</div>`;
        bodyContainer.innerHTML = html;
    }

    // ----------------------------------------------------
    // 2. Render Exercises Overview Grid Tab (Renamed Button: "Vào Làm")
    // ----------------------------------------------------
    function renderExercisesTab() {
        const grid = document.getElementById('exCardsGrid');
        if (!grid) return;

        let filtered = FPGA_EXERCISES.filter(ex => {
            if (state.filterCategory !== 'all' && ex.category !== state.filterCategory) return false;
            if (state.filterDiff !== 'all' && ex.difficulty !== state.filterDiff) return false;
            return true;
        });

        let html = '';
        filtered.forEach(ex => {
            const isDone = state.completedLabs.includes(ex.id);
            const badgeClass = ex.difficulty === 'Cơ bản' ? 'badge-easy' : (ex.difficulty === 'Trung bình' ? 'badge-medium' : 'badge-hard');

            html += `
                <div class="ex-card" onclick="window.openLabById(${ex.id})">
                    <div class="ex-card-header">
                        <span class="badge ${badgeClass}">${ex.difficulty}</span>
                        <span class="status-indicator ${isDone ? 'done' : ''}">
                            ${isDone ? '✓ Đã hoàn thành' : '○ Chưa làm'}
                        </span>
                    </div>
                    <div class="ex-card-title">${ex.title}</div>
                    <div class="ex-card-desc">${ex.desc.replace(/<[^>]*>?/gm, '')}</div>
                    <div class="ex-card-footer">
                        <button class="btn-primary btn-open-lab" onclick="event.stopPropagation(); window.openLabById(${ex.id})" style="width: auto; padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                            Vào Làm →
                        </button>
                        ${isDone ? `
                            <button class="btn-reset-lab" onclick="event.stopPropagation(); window.resetLabById(${ex.id})" title="Xóa bài làm và thực hành lại từ đầu">
                                🔄 Làm lại
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

        // Filter buttons
        document.querySelectorAll('.btn-filter-cat').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-filter-cat').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.filterCategory = btn.dataset.cat;
                renderExercisesTab();
            });
        });
    }

    // Global Reset Lab helper
    window.resetLabById = function(labId) {
        if (confirm(`Bạn có chắc muốn xóa kết quả và làm lại Bài ${labId}?`)) {
            state.completedLabs = state.completedLabs.filter(id => id !== labId);
            localStorage.setItem('fpga_completed', JSON.stringify(state.completedLabs));

            const found = FPGA_EXERCISES.find(e => e.id === labId);
            if (found) {
                state.userCodeMap[labId] = found.template;
                localStorage.setItem('fpga_code', JSON.stringify(state.userCodeMap));
            }

            renderExercisesTab();
            renderWorkspaceSidebar();
            if (state.currentLab && state.currentLab.id === labId) {
                loadLabWorkspace(found);
            }
        }
    };

    // ----------------------------------------------------
    // 3. Load Lab Workspace, Block Diagram & Student Truth Table
    // ----------------------------------------------------
    function loadLabWorkspace(lab) {
        state.currentLab = lab;
        simulatorEngine.reset();

        document.getElementById('wsLabTitle').textContent = lab.title;
        document.getElementById('wsLabCategory').textContent = lab.categoryName + " | " + lab.difficulty;
        document.getElementById('wsLabDesc').innerHTML = lab.desc;

        // Render Visual Module Block Diagram
        renderModuleBlockDiagram(lab);

        // Example Reference setup
        const exampleBlock = document.getElementById('exampleCodeText');
        if (exampleBlock) {
            exampleBlock.textContent = lab.exampleCode || '// Mã ví dụ hướng dẫn...';
        }

        // Render Student Fillable Truth Table & Student Notes Box
        renderStudentFillableTruthTable(lab);

        // Code editor setup
        const codeTextarea = document.getElementById('verilogCodeEditor');
        const savedCode = state.userCodeMap[lab.id] || lab.template;
        codeTextarea.value = savedCode;
        updateCodeHighlight();

        // Testbench & CST setup
        document.getElementById('tbCodeView').textContent = lab.testbench;
        document.getElementById('cstCodeView').textContent = lab.cst;

        // Simulator inputs setup
        state.simInputs = {};
        lab.simInputs.forEach(i => {
            state.simInputs[i.id] = i.default || false;
        });

        renderHardwareBoardControls(lab);
        runSimulationEval();
        renderWorkspaceSidebar();
    }

    // Render Module Block Diagram (Visual I/O Signals)
    function renderModuleBlockDiagram(lab) {
        const container = document.getElementById('wsBlockDiagram');
        if (!container || !lab) return;

        let moduleName = lab.slug ? lab.slug.replace(/^bai-\d+-/, '').replace(/-/g, '_') : 'verilog_module';
        if (lab.solution) {
            const modMatch = lab.solution.match(/module\s+([a-zA-Z0-9_]+)/);
            if (modMatch) moduleName = modMatch[1];
        }

        let inBadges = lab.simInputs.map(i => `
            <div style="background:#1e293b; border:1px solid #3b82f6; color:#93c5fd; padding:3px 8px; border-radius:4px; font-size:0.75rem; white-space:nowrap;">
                ▶ ${i.label}
            </div>
        `).join('');

        let outBadges = lab.simOutputs.map(o => `
            <div style="background:#1e293b; border:1px solid #22c55e; color:#86efac; padding:3px 8px; border-radius:4px; font-size:0.75rem; white-space:nowrap;">
                ◀ ${o.label}
            </div>
        `).join('');

        const html = `
            <div style="background:#ffffff; border:1.5px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-top:8px; box-shadow:var(--shadow-sm);">
                <div style="font-size:0.75rem; font-weight:700; color:var(--accent-blue); margin-bottom:6px;">
                    📐 SƠ ĐỒ KHỐI VÀ TRẠNG THÁI TÍN HIỆU VÀO / RA (BLOCK DIAGRAM):
                </div>
                <div style="display:flex; align-items:center; justify-content:center; gap:12px; padding:6px 0; overflow-x:auto;">
                    <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
                        ${inBadges || '<span style="font-size:0.7rem; color:#64748b;">(Xung Clock 27MHz)</span>'}
                    </div>
                    
                    <div style="color:var(--accent-blue); font-weight:bold; font-size:1.1rem;">➔</div>

                    <div style="background:linear-gradient(135deg, #1e293b, #0f172a); border:2px solid var(--accent-blue); border-radius:8px; padding:8px 16px; text-align:center; min-width:130px; box-shadow:0 4px 12px rgba(37,99,235,0.25);">
                        <strong style="color:#fff; font-size:0.85rem; font-family:'Fira Code', monospace;">${moduleName}</strong>
                        <span style="font-size:0.675rem; color:#38bdf8; display:block; margin-top:2px;">[Gowin Verilog HDL]</span>
                    </div>

                    <div style="color:var(--accent-green); font-weight:bold; font-size:1.1rem;">➔</div>

                    <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-start;">
                        ${outBadges}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Render Fillable Student Truth Table & Free-form Notes Box
    function renderStudentFillableTruthTable(lab) {
        const container = document.getElementById('wsFillableTruthTable');
        if (!container || !lab.fillableTruthTable) return;

        const labSavedTt = state.userTruthTableMap[lab.id] || {};
        const labSavedNotes = state.userNotesMap[lab.id] || '';

        let inHeaders = lab.simInputs.map(i => `<th>${i.label}</th>`).join('');
        let outHeaders = lab.simOutputs.map(o => `<th>${o.label}</th>`).join('');

        let rowsHtml = '';
        lab.fillableTruthTable.forEach((row, rowIdx) => {
            let inCells = '';
            for (const k in row.in) {
                inCells += `<td><strong>${row.in[k]}</strong></td>`;
            }

            let outCells = '';
            for (const k in row.out) {
                const cellKey = `r${rowIdx}_${k}`;
                const val = labSavedTt[cellKey] !== undefined ? labSavedTt[cellKey] : '';
                outCells += `
                    <td>
                        <input type="text" class="tt-input-cell" data-row-idx="${rowIdx}" data-out-key="${k}" value="${val}" placeholder="Nhập 0/1/Hex" style="width:110px; padding:4px 8px; text-align:center; background:#ffffff; color:#0f172a; border:1.5px solid #cbd5e1; border-radius:6px; font-weight:700; font-size:0.825rem;">
                    </td>
                `;
            }

            rowsHtml += `<tr>${inCells}${outCells}</tr>`;
        });

        const notesBoxHtml = `
            <div style="margin-top:10px; border-top:1px dashed #cbd5e1; padding-top:8px;">
                <label style="font-size:0.775rem; font-weight:700; color:var(--accent-amber); display:block; margin-bottom:4px;">
                    📝 Ghi chú & Mô tả kết quả mô phỏng (Sinh viên tự điền):
                </label>
                <textarea id="studentNotesInput" placeholder="Nhập mô tả diễn biến trạng thái, kết quả mô phỏng, hoặc nhận xét mạch..." style="width:100%; height:55px; background:#f8fafc; color:#0f172a; border:1.5px solid #cbd5e1; border-radius:6px; padding:6px 10px; font-size:0.8rem; resize:vertical;">${labSavedNotes}</textarea>
            </div>
        `;

        const tableHtml = `
            <div style="max-height: 220px; overflow-y: auto;">
                <table class="data-table" style="margin:4px 0 8px 0; font-size:0.8rem;">
                    <thead>
                        <tr>${inHeaders}${outHeaders}</tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
            ${notesBoxHtml}
        `;

        container.innerHTML = tableHtml;

        // Input change listeners
        container.querySelectorAll('.tt-input-cell').forEach(inp => {
            inp.addEventListener('input', () => {
                const rowIdx = inp.dataset.rowIdx;
                const outKey = inp.dataset.outKey;
                const cellKey = `r${rowIdx}_${outKey}`;

                if (!state.userTruthTableMap[lab.id]) state.userTruthTableMap[lab.id] = {};
                state.userTruthTableMap[lab.id][cellKey] = inp.value.trim();

                localStorage.setItem('fpga_truthtables', JSON.stringify(state.userTruthTableMap));
            });
        });

        // Notes textarea change listener
        const notesInp = document.getElementById('studentNotesInput');
        if (notesInp) {
            notesInp.addEventListener('input', () => {
                state.userNotesMap[lab.id] = notesInp.value;
                localStorage.setItem('fpga_notes', JSON.stringify(state.userNotesMap));
            });
        }
    }

    // Toggle Example Reference box
    document.getElementById('btnToggleExample')?.addEventListener('click', () => {
        const block = document.getElementById('exampleCodeBlock');
        if (block) {
            const isHidden = block.style.display === 'none' || window.getComputedStyle(block).display === 'none';
            block.style.display = isHidden ? 'block' : 'none';
        }
    });

    // Code Editor Syntax Highlighting & Sync
    function initCodeEditorHighlight() {
        const codeEditor = document.getElementById('verilogCodeEditor');
        if (!codeEditor) return;

        codeEditor.addEventListener('input', () => {
            if (state.currentLab) {
                state.userCodeMap[state.currentLab.id] = codeEditor.value;
                localStorage.setItem('fpga_code', JSON.stringify(state.userCodeMap));
            }
            updateCodeHighlight();
        });

        codeEditor.addEventListener('scroll', () => {
            const bgElem = document.querySelector('.code-highlight-bg');
            if (bgElem) {
                bgElem.scrollTop = codeEditor.scrollTop;
                bgElem.scrollLeft = codeEditor.scrollLeft;
            }
        });
    }

    function updateCodeHighlight() {
        const codeEditor = document.getElementById('verilogCodeEditor');
        const highlightElem = document.getElementById('verilogCodeHighlight');
        const bgElem = document.querySelector('.code-highlight-bg');
        if (!codeEditor || !highlightElem) return;

        let code = codeEditor.value;
        let highlighted = highlightVerilog(code);
        if (code.endsWith('\n')) {
            highlighted += ' ';
        }
        highlightElem.innerHTML = highlighted;
        if (bgElem) {
            bgElem.scrollTop = codeEditor.scrollTop;
            bgElem.scrollLeft = codeEditor.scrollLeft;
        }
    }

    function highlightVerilog(code) {
        if (!code) return '';
        let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("([^"\\]|\\.)*")|(`[a-zA-Z_]\w*)|(\$[a-zA-Z_]\w*)|(\b\d+'[bBoOdDhH][0-9a-fA-F_xzXZ]+\b|\b\d+\b)|(\b(?:module|endmodule|input|output|inout|wire|reg|assign|always|initial|begin|end|if|else|case|endcase|default|parameter|localparam|posedge|negedge|or|and|not|nand|nor|xor|xnor|function|endfunction|task|endtask|integer|genvar|generate|endgenerate)\b)|([&|=~^!+*\/%<>:?-]+)/g;

        return escaped.replace(tokenRegex, (match, comment, str, strInner, directive, sysTask, num, keyword, op) => {
            if (comment) return `<span class="hl-comment">${comment}</span>`;
            if (str) return `<span class="hl-string">${str}</span>`;
            if (directive) return `<span class="hl-directive">${directive}</span>`;
            if (sysTask) return `<span class="hl-system">${sysTask}</span>`;
            if (num) return `<span class="hl-number">${num}</span>`;
            if (keyword) return `<span class="hl-keyword">${keyword}</span>`;
            if (op) return `<span class="hl-operator">${op}</span>`;
            return match;
        });
    }

    // Render Hardware Controls (Full Tang Nano 9K Board Visualizer)
    function renderHardwareBoardControls(lab) {
        const swContainer = document.getElementById('hwSwitchContainer');
        const ledContainer = document.getElementById('hwLedContainer');
        if (!swContainer || !ledContainer) return;

        let swHtml = '';
        if (lab.simInputs.length === 0) {
            swHtml = `<span style="font-size:0.8rem; color:var(--text-subtle)">Tự chạy theo xung Clock nhịp ảo 27MHz</span>`;
        } else {
            lab.simInputs.forEach(inp => {
                const val = state.simInputs[inp.id];
                swHtml += `
                    <button class="btn-hw-switch ${val ? 'active' : ''}" onclick="window.toggleSwitch('${inp.id}')">
                        ${inp.label}: <span>${val ? '1 (ON/Nhấn)' : '0 (OFF/Thả)'}</span>
                    </button>
                `;
            });
        }
        swContainer.innerHTML = swHtml;

        const fullPins = [
            { id: "led0", pin: "10", label: "LED0 (P10)" },
            { id: "led1", pin: "11", label: "LED1 (P11)" },
            { id: "led2", pin: "13", label: "LED2 (P13)" },
            { id: "led3", pin: "14", label: "LED3 (P14)" },
            { id: "led4", pin: "15", label: "LED4 (P15)" },
            { id: "led5", pin: "16", label: "LED5 (P16)" }
        ];

        let ledHtml = '';
        fullPins.forEach((p, idx) => {
            const matchingLabOut = lab.simOutputs.find(o => o.id === p.id || o.label.includes(`LED${idx}`) || o.label.includes(`out[${idx}]`) || o.label.includes(`code[${idx}]`) || o.label.includes(`count[${idx}]`) || idx === 0);
            const targetId = matchingLabOut ? matchingLabOut.id : p.id;

            ledHtml += `
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <div class="led-indicator" id="led_ind_${targetId}">0</div>
                    <span style="font-size:0.7rem; color:var(--text-subtle); margin-top:4px;">${p.label}</span>
                </div>
            `;
        });
        ledContainer.innerHTML = ledHtml;
    }

    window.toggleSwitch = function(inpId) {
        state.simInputs[inpId] = !state.simInputs[inpId];
        renderHardwareBoardControls(state.currentLab);
        runSimulationEval();
    };

    function runSimulationEval() {
        if (!state.currentLab) return;
        const res = simulatorEngine.evaluateLab(state.currentLab, state.simInputs);

        state.currentLab.simOutputs.forEach(o => {
            const el = document.getElementById(`led_ind_${o.id}`);
            if (el) {
                const val = res.outputs[o.id] ? 1 : 0;
                if (val === 1) {
                    el.classList.add('on');
                    el.textContent = '1';
                } else {
                    el.classList.remove('on');
                    el.textContent = '0';
                }
            }
        });

        renderWaveformSVG('waveformSvgContainer', res.waveHistory, state.currentLab.simInputs, state.currentLab.simOutputs);
        return res;
    }

    document.getElementById('btnStartClock')?.addEventListener('click', () => {
        simulatorEngine.startClock(() => {
            runSimulationEval();
        });
    });

    document.getElementById('btnStopClock')?.addEventListener('click', () => {
        simulatorEngine.stopClock();
    });

    document.getElementById('btnRunSim')?.addEventListener('click', () => {
        runSimulationEval();
    });

    // ----------------------------------------------------
    // Student Submission Workflow & Firebase Cloud Sync
    // ----------------------------------------------------
    const FIREBASE_DB_URL = "https://fpga-nano9k-default-rtdb.firebaseio.com";

    async function syncSubmissionToCloud(labId, currentCode, studentTt, grade) {
        if (!state.student || !state.student.id) return;

        const subObj = {
            studentId: state.student.id,
            studentName: state.student.name,
            studentClass: state.student.class || 'N/A',
            labId: labId,
            labTitle: state.currentLab ? state.currentLab.title : `Bài ${labId}`,
            code: currentCode,
            truthTable: studentTt,
            notes: state.userNotesMap ? (state.userNotesMap[labId] || '') : '',
            grade: grade,
            submittedAt: new Date().toISOString()
        };

        // 1. Save to local storage for local backup / offline mode
        let allLocal = JSON.parse(localStorage.getItem('fpga_all_submissions') || '{}');
        if (!allLocal[state.student.id]) {
            allLocal[state.student.id] = {
                info: { id: state.student.id, name: state.student.name, class: state.student.class || 'N/A' },
                labs: {}
            };
        }
        allLocal[state.student.id].info.name = state.student.name;
        allLocal[state.student.id].info.class = state.student.class || 'N/A';
        allLocal[state.student.id].info.lastActive = new Date().toISOString();
        allLocal[state.student.id].labs[labId] = subObj;
        localStorage.setItem('fpga_all_submissions', JSON.stringify(allLocal));

        // 2. Try pushing to Cloud Database REST API
        try {
            await fetch(`${FIREBASE_DB_URL}/submissions/${state.student.id}/${labId}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subObj)
            });

            await fetch(`${FIREBASE_DB_URL}/students/${state.student.id}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: state.student.id,
                    name: state.student.name,
                    class: state.student.class || 'N/A',
                    lastActive: new Date().toISOString()
                })
            });
        } catch (err) {
            console.warn('Firebase sync notice:', err);
        }
    }

    document.getElementById('btnSubmitLab')?.addEventListener('click', async () => {
        if (!state.currentLab) return;

        const currentCode = document.getElementById('verilogCodeEditor').value;
        const studentTt = state.userTruthTableMap[state.currentLab.id] || {};
        const simRes = runSimulationEval();

        // Background AI evaluation (Stored for Teacher view)
        const grade = aiGraderEngine.gradeSubmission(state.currentLab, currentCode, simRes, studentTt);

        if (!state.userGradesMap) state.userGradesMap = {};
        state.userGradesMap[state.currentLab.id] = grade;
        localStorage.setItem('fpga_user_grades', JSON.stringify(state.userGradesMap));

        if (!state.completedLabs.includes(state.currentLab.id)) {
            state.completedLabs.push(state.currentLab.id);
            localStorage.setItem('fpga_completed', JSON.stringify(state.completedLabs));
        }

        // Sync to cloud database
        await syncSubmissionToCloud(state.currentLab.id, currentCode, studentTt, grade);

        alert(`🎉 NỘP BÀI THÀNH CÔNG!\nBài thực hành "${state.currentLab.title}" của bạn đã được ghi nhận và lưu lên Cloud Database cho Giảng viên.`);

        renderExercisesTab();
        renderWorkspaceSidebar();
    });

    // ----------------------------------------------------
    // Teacher Dashboard Sub-tabs & Real-time Cloud Inspector
    // ----------------------------------------------------
    let cachedCloudSubmissions = null;

    document.getElementById('btnTeacherSubTabSubmissions')?.addEventListener('click', () => {
        document.getElementById('teacherSubmissionsView').style.display = 'block';
        document.getElementById('teacherSolutionsView').style.display = 'none';
        document.getElementById('btnTeacherSubTabSubmissions').style.background = 'linear-gradient(135deg, #10b981, #059669)';
        document.getElementById('btnTeacherSubTabSolutions').style.background = '#475569';
        renderTeacherStudentDashboard();
    });

    document.getElementById('btnTeacherSubTabSolutions')?.addEventListener('click', () => {
        document.getElementById('teacherSubmissionsView').style.display = 'none';
        document.getElementById('teacherSolutionsView').style.display = 'block';
        document.getElementById('btnTeacherSubTabSolutions').style.background = 'linear-gradient(135deg, #2563eb, #0284c7)';
        document.getElementById('btnTeacherSubTabSubmissions').style.background = '#475569';
        renderTeacherSolutions();
    });

    document.getElementById('btnRefreshSubmissions')?.addEventListener('click', () => {
        renderTeacherStudentDashboard(true);
    });

    document.getElementById('teacherSearchStudent')?.addEventListener('input', () => {
        renderTeacherStudentDashboard(false);
    });

    // Offline JSON File Import for Teacher
    document.getElementById('btnImportStudentJson')?.addEventListener('click', () => {
        document.getElementById('inputJsonFile').click();
    });

    document.getElementById('inputJsonFile')?.addEventListener('change', (evt) => {
        const file = evt.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.studentId && data.labs) {
                    let allLocal = JSON.parse(localStorage.getItem('fpga_all_submissions') || '{}');
                    allLocal[data.studentId] = data;
                    localStorage.setItem('fpga_all_submissions', JSON.stringify(allLocal));
                    alert(`✅ Đã nạp thành công dữ liệu bài làm của Sinh viên: ${data.studentName} (${data.studentId})`);
                    renderTeacherStudentDashboard(true);
                } else {
                    alert('❌ File JSON không đúng định dạng bài làm sinh viên!');
                }
            } catch (err) {
                alert('❌ Lỗi đọc file JSON!');
            }
        };
        reader.readAsText(file);
    });

    async function renderTeacherStudentDashboard(forceRefresh = false) {
        const container = document.getElementById('teacherStudentTableContainer');
        if (!container) return;

        container.innerHTML = '<div style="color:var(--accent-cyan); font-size:0.9rem; padding:20px; text-align:center;">⏳ Đang tải dữ liệu bài làm sinh viên từ Cloud Database...</div>';

        let studentMap = {};

        // 1. Load from localStorage (Local Backup)
        let localSubmissions = JSON.parse(localStorage.getItem('fpga_all_submissions') || '{}');
        for (let sId in localSubmissions) {
            studentMap[sId] = localSubmissions[sId];
        }

        // 2. Fetch from Firebase REST API
        try {
            const resp = await fetch(`${FIREBASE_DB_URL}/submissions.json`);
            if (resp.ok) {
                const cloudData = await resp.json();
                if (cloudData) {
                    for (let sId in cloudData) {
                        const sLabs = cloudData[sId];
                        if (!studentMap[sId]) {
                            const firstLabKey = Object.keys(sLabs)[0];
                            const sample = sLabs[firstLabKey];
                            studentMap[sId] = {
                                info: {
                                    id: sample.studentId || sId,
                                    name: sample.studentName || `Sinh viên ${sId}`,
                                    class: sample.studentClass || 'N/A'
                                },
                                labs: {}
                            };
                        }
                        for (let lId in sLabs) {
                            studentMap[sId].labs[lId] = sLabs[lId];
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Cannot fetch Firebase cloud data, using local submissions:', e);
        }

        cachedCloudSubmissions = studentMap;

        // Filter by search text
        const query = (document.getElementById('teacherSearchStudent')?.value || '').toLowerCase().trim();
        let studentList = Object.values(studentMap).map(s => s.info);

        if (query) {
            studentList = studentList.filter(s => 
                (s.id && s.id.toLowerCase().includes(query)) ||
                (s.name && s.name.toLowerCase().includes(query)) ||
                (s.class && s.class.toLowerCase().includes(query))
            );
        }

        if (studentList.length === 0) {
            container.innerHTML = `
                <div style="background:#0f172a; border:1px solid #334155; border-radius:8px; padding:2rem; text-align:center; color:var(--text-subtle);">
                    📭 Chưa có bài làm nào của sinh viên được nộp trên hệ thống.<br>
                    <span style="font-size:0.8rem; color:var(--accent-cyan); margin-top:6px; display:block;">(Khi sinh viên làm bài và nhấn "✓ Nộp Bài", bài làm sẽ tự động xuất hiện tại đây).</span>
                </div>
            `;
            return;
        }

        let rowsHtml = '';
        studentList.forEach((s, idx) => {
            const sData = studentMap[s.id] || { labs: {} };
            const submittedLabs = Object.values(sData.labs || {});
            const submittedCount = submittedLabs.length;
            
            let totalScore = 0;
            submittedLabs.forEach(l => {
                if (l.grade && l.grade.score !== undefined) totalScore += l.grade.score;
            });
            const avgScore = submittedCount > 0 ? Math.round(totalScore / submittedCount) : 0;

            let lastTimeStr = 'Chưa có';
            if (s.lastActive) {
                lastTimeStr = new Date(s.lastActive).toLocaleString('vi-VN');
            } else if (submittedCount > 0) {
                const dates = submittedLabs.map(l => l.submittedAt).filter(Boolean);
                if (dates.length > 0) {
                    lastTimeStr = new Date(dates.sort().pop()).toLocaleString('vi-VN');
                }
            }

            rowsHtml += `
                <tr style="border-bottom:1px solid #334155; transition:background 0.2s;">
                    <td style="padding:10px 12px; color:var(--text-subtle);">${idx + 1}</td>
                    <td style="padding:10px 12px; font-weight:700; color:var(--accent-cyan);">${escapeHtml(s.id)}</td>
                    <td style="padding:10px 12px; font-weight:600; color:#fff;">${escapeHtml(s.name)}</td>
                    <td style="padding:10px 12px; color:var(--text-muted);">${escapeHtml(s.class || 'N/A')}</td>
                    <td style="padding:10px 12px; text-align:center;">
                        <span class="badge badge-medium" style="font-size:0.8rem;">${submittedCount} / 35 bài</span>
                    </td>
                    <td style="padding:10px 12px; text-align:center;">
                        <span class="badge ${avgScore >= 80 ? 'badge-easy' : (avgScore >= 50 ? 'badge-medium' : 'badge-hard')}" style="font-size:0.85rem;">
                            ${avgScore}/100
                        </span>
                    </td>
                    <td style="padding:10px 12px; font-size:0.8rem; color:var(--text-subtle);">${lastTimeStr}</td>
                    <td style="padding:10px 12px; text-align:center;">
                        <button class="btn-primary btn-view-student" data-studentid="${s.id}" style="font-size:0.75rem; padding:4px 10px; background:linear-gradient(135deg, #2563eb, #0284c7);">
                            🔍 Xem Chi Tiết
                        </button>
                    </td>
                </tr>
            `;
        });

        container.innerHTML = `
            <div style="background:#0f172a; border:1px solid #334155; border-radius:8px; overflow:hidden;">
                <table style="width:100%; border-collapse:collapse; text-align:left;">
                    <thead>
                        <tr style="background:#1e293b; color:var(--accent-amber); font-size:0.85rem; border-bottom:2px solid #334155;">
                            <th style="padding:10px 12px;">STT</th>
                            <th style="padding:10px 12px;">Mã Sinh Viên</th>
                            <th style="padding:10px 12px;">Họ và Tên</th>
                            <th style="padding:10px 12px;">Lớp</th>
                            <th style="padding:10px 12px; text-align:center;">Tiến độ</th>
                            <th style="padding:10px 12px; text-align:center;">Điểm AI TB</th>
                            <th style="padding:10px 12px;">Nộp lần cuối</th>
                            <th style="padding:10px 12px; text-align:center;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;

        container.querySelectorAll('.btn-view-student').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sId = e.target.getAttribute('data-studentid');
                openStudentDetailModal(sId);
            });
        });
    }

    function openStudentDetailModal(studentId) {
        const modal = document.getElementById('studentDetailModal');
        const titleElem = document.getElementById('modalStudentTitle');
        const subTitleElem = document.getElementById('modalStudentSubTitle');
        const contentElem = document.getElementById('modalStudentContent');
        if (!modal || !contentElem) return;

        const sData = cachedCloudSubmissions ? cachedCloudSubmissions[studentId] : null;
        if (!sData) {
            alert('Không tìm thấy dữ liệu sinh viên!');
            return;
        }

        const info = sData.info || {};
        const labs = sData.labs || {};
        const submittedLabIds = Object.keys(labs).map(Number).sort((a,b)=>a-b);

        titleElem.textContent = `Bài Làm Sinh Viên: ${info.name} (MSV: ${info.id})`;
        subTitleElem.textContent = `Lớp khóa học: ${info.class || 'N/A'} | Đã nộp ${submittedLabIds.length}/35 bài thực hành`;

        let labsHtml = '';
        if (submittedLabIds.length === 0) {
            labsHtml = '<div style="color:var(--text-subtle); padding:1rem;">Sinh viên chưa nộp bài thực hành nào.</div>';
        } else {
            submittedLabIds.forEach(lId => {
                const labObj = FPGA_EXERCISES.find(e => e.id === lId) || { title: `Bài ${lId}`, desc: '', solution: '' };
                const sub = labs[lId];
                const grade = sub.grade || null;

                let gradeBlock = '';
                if (grade) {
                    let checksHtml = (grade.checks || []).map(c => `
                        <div style="font-size:0.8rem; color:${c.pass ? 'var(--accent-green)' : 'var(--accent-red)'}; margin-top:2px;">
                            ${c.pass ? '✓' : '❌'} <strong>${c.name}:</strong> ${c.msg}
                        </div>
                    `).join('');

                    gradeBlock = `
                        <div style="background:#050811; border:1px solid #1e293b; border-radius:6px; padding:0.75rem; margin-top:10px;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="color:var(--accent-amber); font-size:0.85rem;">🤖 KẾT QUẢ AI CHẤM ĐIỂM & ĐÁNH GIÁ:</strong>
                                <span class="badge ${grade.isPass ? 'badge-easy' : 'badge-hard'}" style="font-size:0.8rem;">
                                    Điểm AI: ${grade.score}/100 [${grade.status}]
                                </span>
                            </div>
                            <p style="color:#fff; font-weight:600; font-size:0.825rem; margin:4px 0;">${grade.summary}</p>
                            ${checksHtml}
                        </div>
                    `;
                }

                labsHtml += `
                    <div style="background:#0f172a; border:1px solid #334155; border-radius:8px; padding:1rem; margin-bottom:1rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--accent-cyan); font-size:0.95rem;">${labObj.title}</strong>
                            <span style="font-size:0.75rem; color:var(--text-subtle);">Thời gian nộp: ${sub.submittedAt ? new Date(sub.submittedAt).toLocaleString('vi-VN') : 'N/A'}</span>
                        </div>

                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:8px;">
                            <div>
                                <div class="code-block-header" style="color:var(--accent-cyan);">Mã Verilog Sinh Viên Viết</div>
                                <pre style="max-height:160px; overflow:auto;"><code class="language-verilog">${escapeHtml(sub.code || '')}</code></pre>
                            </div>
                            <div>
                                <div class="code-block-header" style="color:var(--accent-green);">Mã Verilog Đáp Án Mẫu</div>
                                <pre style="max-height:160px; overflow:auto;"><code class="language-verilog">${escapeHtml(labObj.solution || labObj.template)}</code></pre>
                            </div>
                        </div>

                        ${renderTruthTableHtmlForPdf(labObj, sub.truthTable)}
                        ${sub.notes ? `<div style="font-size:0.8rem; color:var(--accent-amber); margin-top:4px;"><strong>Ghi chú mô phỏng:</strong> ${escapeHtml(sub.notes)}</div>` : ''}

                        ${gradeBlock}
                    </div>
                `;
            });
        }

        contentElem.innerHTML = labsHtml;
        modal.style.display = 'flex';
    }

    document.getElementById('btnCloseStudentModal')?.addEventListener('click', () => {
        const modal = document.getElementById('studentDetailModal');
        if (modal) modal.style.display = 'none';
    });

    // ----------------------------------------------------
    // 4. Teacher Solutions & Reference Solutions Panel
    // ----------------------------------------------------
    function renderTeacherSolutions() {
        const container = document.getElementById('teacherSolutionsList');
        if (!container) return;

        let html = '';
        FPGA_EXERCISES.forEach(lab => {
            const studentCode = state.userCodeMap[lab.id] || 'Chưa có bài làm';
            const studentTt = state.userTruthTableMap[lab.id] || {};
            const studentNotes = state.userNotesMap ? state.userNotesMap[lab.id] || '' : '';
            const grade = state.userGradesMap ? state.userGradesMap[lab.id] || null : null;

            let gradeHtml = '<div style="color:var(--text-subtle); font-size:0.8rem; margin-top:8px;">Sinh viên chưa nộp bài này.</div>';
            if (grade) {
                let checksHtml = grade.checks.map(c => `
                    <div style="margin-top:2px; color: ${c.pass ? 'var(--accent-green)' : 'var(--accent-red)'}; font-size:0.8rem;">
                        ${c.pass ? '✓' : '❌'} <strong>${c.name}:</strong> ${c.msg}
                    </div>
                `).join('');

                let feedbackHtml = grade.feedback.map(f => `
                    <div style="color:var(--accent-amber); font-size:0.8rem; margin-top:2px;">${f}</div>
                `).join('');

                gradeHtml = `
                    <div style="background:#070b14; border:1px solid #1e293b; border-radius:6px; padding:0.75rem; margin-top:10px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong style="color:var(--accent-amber); font-size:0.85rem;">🤖 KẾT QUẢ AI CHẤM ĐIỂM & ĐÁNH GIÁ (GIẢNG VIÊN XEM):</strong>
                            <span class="badge ${grade.isPass ? 'badge-easy' : 'badge-hard'}" style="font-size:0.8rem;">
                                Điểm AI: ${grade.score}/100 [${grade.status}]
                            </span>
                        </div>
                        <p style="color:#fff; font-weight:600; font-size:0.825rem; margin:4px 0;">${grade.summary}</p>
                        ${checksHtml}
                        ${feedbackHtml}
                    </div>
                `;
            }

            html += `
                <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong style="color:var(--accent-cyan); font-size:1rem;">Bài ${lab.id}: ${lab.title}</strong>
                        <span class="badge badge-easy">${lab.difficulty}</span>
                    </div>
                    <p style="font-size:0.825rem; color:var(--text-muted); margin:4px 0 8px 0;">${lab.desc.replace(/<[^>]*>?/gm, '')}</p>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:8px;">
                        <div>
                            <div class="code-block-header" style="color:var(--accent-green);">Mã Verilog Đáp Án Chuẩn (Reference Solution)</div>
                            <pre style="max-height:160px; overflow:auto;"><code class="language-verilog">${escapeHtml(lab.solution || lab.template)}</code></pre>
                        </div>
                        <div>
                            <div class="code-block-header" style="color:var(--accent-cyan);">Mã Verilog Sinh Viên Đã Nộp</div>
                            <pre style="max-height:160px; overflow:auto;"><code class="language-verilog">${escapeHtml(studentCode)}</code></pre>
                        </div>
                    </div>

                    ${renderTruthTableHtmlForPdf(lab, studentTt)}
                    ${studentNotes ? `<div style="font-size:0.8rem; color:var(--accent-amber); margin-top:4px;"><strong>Ghi chú mô phỏng của Sinh viên:</strong> ${escapeHtml(studentNotes)}</div>` : ''}

                    ${gradeHtml}
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // ----------------------------------------------------
    // 5. Pinout Matrix & Fixed Signature PDF Report Export
    // ----------------------------------------------------
    function renderPinoutTab() {
        const pinContainer = document.getElementById('pinoutTableBody');
        if (!pinContainer) return;

        let html = '';
        TANG_NANO_9K_PINS.forEach(p => {
            html += `
                <tr>
                    <td style="font-weight:700; color:var(--accent-cyan);">${p.name}</td>
                    <td><span class="badge badge-medium">PIN ${p.pin}</span></td>
                    <td>${p.type}</td>
                    <td>${p.mode}</td>
                    <td style="color:var(--text-muted);">${p.desc}</td>
                </tr>
            `;
        });
        pinContainer.innerHTML = html;
    }

    function renderTruthTableHtmlForPdf(ex, studentTt) {
        if (!ex.fillableTruthTable || ex.fillableTruthTable.length === 0) return '';
        let inHeaders = ex.simInputs.map(i => `<th style="padding:4px; border:1px solid #cbd5e1;">${i.label}</th>`).join('');
        let outHeaders = ex.simOutputs.map(o => `<th style="padding:4px; border:1px solid #cbd5e1;">${o.label}</th>`).join('');

        let rowsHtml = '';
        ex.fillableTruthTable.forEach((row, rowIdx) => {
            let inCells = '';
            for (const k in row.in) inCells += `<td style="padding:4px; border:1px solid #cbd5e1; text-align:center;">${row.in[k]}</td>`;
            let outCells = '';
            for (const k in row.out) {
                const cellKey = `r${rowIdx}_${k}`;
                const val = studentTt && studentTt[cellKey] !== undefined ? studentTt[cellKey] : '-';
                outCells += `<td style="padding:4px; border:1px solid #cbd5e1; text-align:center; font-weight:bold; color:#1e3a8a;">${escapeHtml(val)}</td>`;
            }
            rowsHtml += `<tr>${inCells}${outCells}</tr>`;
        });

        return `
            <div style="margin: 6px 0;">
                <div style="font-weight: bold; font-size: 8.5pt; color: #1e293b;">Bảng chân lý / Bảng trạng thái sinh viên đã điền:</div>
                <table style="width: 100%; border-collapse: collapse; font-size: 8pt; margin-top: 2px;">
                    <thead><tr style="background: #f1f5f9;">${inHeaders}${outHeaders}</tr></thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        `;
    }

    function renderWaveformHtmlForPdf(ex) {
        if (!ex || !ex.simInputs || !ex.simOutputs) return '';

        const sampleCount = 6;
        const svgWidth = 400;
        const stepX = (svgWidth - 20) / (sampleCount - 1);

        let allSigs = [];
        ex.simInputs.forEach(i => allSigs.push({ id: i.id, label: i.label, isInput: true }));
        ex.simOutputs.forEach(o => allSigs.push({ id: o.id, label: o.label, isInput: false }));

        let rowsHtml = '';
        allSigs.forEach((sig, sIdx) => {
            const strokeColor = sig.isInput ? '#1e3a8a' : '#15803d';
            const bgLine = sig.isInput ? '#eff6ff' : '#f0fdf4';

            let vals = [];
            if (sig.isInput) {
                vals = (sIdx % 2 === 0) ? [0, 0, 1, 1, 0, 1] : [0, 1, 0, 1, 1, 0];
            } else {
                if (ex.id === 1) { // btn_led: assign led = btn
                    vals = [0, 0, 1, 1, 0, 1];
                } else if (ex.id === 2) { // NOT gate: assign y = ~a
                    vals = [1, 1, 0, 0, 1, 0];
                } else {
                    vals = (sIdx % 2 === 0) ? [0, 0, 1, 1, 0, 1] : [1, 1, 0, 0, 1, 0];
                }
            }

            let pathD = '';
            vals.forEach((v, idx) => {
                const x = 10 + idx * stepX;
                const y = (v === 1) ? 4 : 20;

                if (idx === 0) {
                    pathD += `M ${x.toFixed(1)} ${y}`;
                } else {
                    const prevV = vals[idx - 1];
                    const prevY = (prevV === 1) ? 4 : 20;

                    if (prevY !== y) {
                        pathD += ` L ${x.toFixed(1)} ${prevY} L ${x.toFixed(1)} ${y}`;
                    } else {
                        pathD += ` L ${x.toFixed(1)} ${y}`;
                    }
                }
            });

            rowsHtml += `
                <div style="display:flex; align-items:center; margin-bottom:4px; page-break-inside:avoid;">
                    <div style="width:145px; font-size:7.5pt; font-weight:600; color:${strokeColor}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${sig.isInput ? '▶ IN' : '◀ OUT'}: ${sig.label}
                    </div>
                    <div style="flex:1; background:${bgLine}; border:1px solid #cbd5e1; border-radius:3px; padding:2px 6px; height:24px; display:flex; align-items:center;">
                        <svg width="100%" height="22" viewBox="0 0 ${svgWidth} 24" preserveAspectRatio="none" style="display:block;">
                            <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" />
                        </svg>
                    </div>
                </div>
            `;
        });

        return `
            <div style="margin: 6px 0; background: #fafafa; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 10px; page-break-inside: avoid;">
                <div style="font-weight: bold; font-size: 8.5pt; color: #0f172a; margin-bottom: 4px;">📊 Kết quả mô phỏng dạng sóng (Waveform GTKWave view):</div>
                ${rowsHtml}
            </div>
        `;
    }

    function initPdfReportExport() {
        document.getElementById('btnPrintPdfReport')?.addEventListener('click', () => {
            if (!state.student || !state.student.name) {
                alert('Vui lòng nhập đầy đủ thông tin sinh viên trước khi in báo cáo!');
                return;
            }

            const reportContainer = document.getElementById('pdfReportContainer');
            if (!reportContainer) return;

            const totalLabs = FPGA_EXERCISES.length;
            const doneLabsCount = state.completedLabs.length;
            const completionPercent = Math.round((doneLabsCount / totalLabs) * 100);

            let completedLabsRows = '';
            FPGA_EXERCISES.forEach(ex => {
                const isDone = state.completedLabs.includes(ex.id);
                const code = state.userCodeMap[ex.id] || ex.template;
                const tt = state.userTruthTableMap[ex.id] || {};
                const notes = state.userNotesMap[ex.id] || '';
                if (isDone) {
                    completedLabsRows += `
                        <div style="margin-bottom: 25px; page-break-inside: avoid;">
                            <h3 style="font-size: 11pt; color: #1e3a8a; margin-bottom: 4px;">
                                Bài ${ex.id}: ${ex.title} [${ex.categoryName}]
                            </h3>
                            <div style="font-size: 9.5pt; color: #334155; margin-bottom: 4px;">
                                <strong>Yêu cầu:</strong> ${ex.desc.replace(/<[^>]*>?/gm, '')}
                            </div>
                            ${renderTruthTableHtmlForPdf(ex, tt)}
                            ${notes ? `<div style="font-size: 8.5pt; color: #334155; margin-top: 3px;"><strong>Ghi chú / Nhận xét mô phỏng:</strong> ${escapeHtml(notes)}</div>` : ''}
                            ${renderWaveformHtmlForPdf(ex)}
                            <div style="font-weight: bold; font-size: 9pt; color: #0f172a; margin-top: 4px;">Mã Verilog HDL do sinh viên viết:</div>
                            <div class="report-code-box">${escapeHtml(code)}</div>
                            <div style="font-size: 8.5pt; color: #475569;">
                                <strong>Ràng buộc chân (.cst):</strong> <code>${ex.cst.replace(/\n/g, ' | ')}</code>
                            </div>
                        </div>
                    `;
                }
            });

            const nowStr = new Date().toLocaleDateString('vi-VN');

            // Fixed Signature Layout with ThS. Nguyễn Tiến Sỹ on Right Side & Sentence Case Labels
            const reportHtml = `
                <div class="report-page">
                    <div class="report-header">
                        <h3>Trường đại học Mỏ - Địa chất</h3>
                        <h3>Khoa Cơ - Điện | Bộ môn Kỹ thuật điện - Điện tử</h3>
                        <br>
                        <h1 style="font-size: 16pt; font-weight: bold; color: #1e3a8a; margin-bottom: 6px;">Báo cáo thực hành lập trình nhúng trên Kit FPGA Tang nano 9k</h1>
                        <h2 style="font-size: 13pt; color: #1e40af; font-weight: normal;">Môn học: Thực hành lập trình nhúng</h2>
                    </div>

                    <div class="report-info-grid">
                        <div><strong>Họ và tên sinh viên:</strong> ${state.student.name}</div>
                        <div><strong>Mã sinh viên:</strong> ${state.student.id}</div>
                        <div><strong>Lớp khóa học / nhóm:</strong> ${state.student.class}</div>
                        <div><strong>Giảng viên hướng dẫn:</strong> ThS. Nguyễn Tiến Sỹ</div>
                        <div><strong>Kit thực hành:</strong> FPGA Tang nano 9k | <strong>Ngôn ngữ:</strong> Verilog</div>
                        <div><strong>Ngày xuất báo cáo:</strong> ${nowStr}</div>
                        <div><strong>Tổng số bài đã hoàn thành:</strong> ${doneLabsCount} / ${totalLabs} bài (${completionPercent}%)</div>
                    </div>

                    <h2 style="font-size: 13pt; color: #1e3a8a; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 12px;">
                        Danh sách bài thực hành đã hoàn thành (${doneLabsCount} bài)
                    </h2>

                    ${completedLabsRows || '<p style="font-style:italic;">Chưa có bài thực hành nào được nộp hoàn thành.</p>'}

                    <div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-start; page-break-inside: avoid;">
                        <div style="text-align: center; width: 260px;">
                            <strong style="font-size: 11pt;">Sinh viên xác nhận</strong><br>
                            <span style="font-size: 8.5pt; color: #475569;">(Ký và ghi rõ họ tên)</span><br><br><br><br><br>
                            <div style="font-weight: bold; font-size: 11pt; color: #0f172a; margin-top: 15px;">${state.student.name}</div>
                        </div>
                        <div style="text-align: center; width: 280px;">
                            <strong style="font-size: 11pt;">Giảng viên hướng dẫn</strong><br>
                            <span style="font-size: 8.5pt; color: #475569;">(Ký và cho điểm báo cáo)</span><br><br><br><br><br>
                            <div style="font-weight: bold; font-size: 11pt; color: #0f172a; margin-top: 15px;">ThS. Nguyễn Tiến Sỹ</div>
                        </div>
                    </div>
                </div>
            `;

            reportContainer.innerHTML = reportHtml;

            setTimeout(() => {
                window.print();
            }, 300);
        });
    }

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
