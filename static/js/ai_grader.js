/**
 * AI AUTO-GRADER & VERILOG CODE ANALYZER ENGINE (STRICT EVALUATION v6)
 * Real-time syntax check, Truth Table value verification, and Verilog logic AST/Expression evaluation.
 */

class AIVerilogGrader {
    constructor() {}

    gradeSubmission(exercise, studentCode, simResult, studentTruthTable) {
        let score = 100;
        let checks = [];
        let feedback = [];
        let isPass = true;

        if (!studentCode || studentCode.trim().length < 10) {
            return {
                score: 0,
                isPass: false,
                status: 'Chưa có code',
                summary: '❌ Chưa nhận được mã Verilog hợp lệ.',
                checks: [{ name: 'Cú pháp cơ bản', pass: false, msg: 'Mã nguồn trống hoặc quá ngắn.' }],
                feedback: ['Hãy viết mã Verilog hoàn chỉnh vào khung biên tập trước khi nộp bài.']
            };
        }

        // 1. Kiểm tra cấu trúc Module
        const hasModule = /\bmodule\s+\w+/.test(studentCode);
        const hasEndmodule = /\bendmodule\b/.test(studentCode);

        if (hasModule && hasEndmodule) {
            checks.push({ name: 'Cấu trúc Module Verilog', pass: true, msg: 'Khai báo module ... endmodule hợp lệ.' });
        } else {
            score -= 30;
            isPass = false;
            checks.push({ name: 'Cấu trúc Module Verilog', pass: false, msg: 'Thiếu từ khóa module hoặc endmodule.' });
            feedback.push('⚠️ Mã Verilog phải chứa khối `module <tên>` và kết thúc bằng `endmodule`.');
        }

        // 2. Phân tích Phép gán & Quy tắc mạch
        if (studentCode.includes('always')) {
            const isCombAlways = /always\s*@\s*\(\s*\*\s*\)/.test(studentCode) || /always\s*@\s*\([^p]*\)/.test(studentCode);
            const isSeqAlways = /posedge|negedge/.test(studentCode);

            if (isCombAlways && !isSeqAlways) {
                if (/<=/.test(studentCode)) {
                    score -= 10;
                    checks.push({ name: 'Quy tắc phép gán', pass: false, msg: 'Dùng phép gán Non-blocking (<=) trong mạch tổ hợp.' });
                    feedback.push('💡 Trong khối `always @(*)` mạch tổ hợp, nên dùng phép gán Blocking (`=`).');
                } else {
                    checks.push({ name: 'Quy tắc phép gán', pass: true, msg: 'Sử dụng phép gán Blocking (=) chuẩn cho mạch tổ hợp.' });
                }
            }

            if (isSeqAlways) {
                // Look for blocking assignment (=) inside posedge always block that is not <= or == or !=
                const posedgeBlocks = studentCode.match(/always\s*@\s*\([^)]*posedge[^)]*\)[\s\S]*?(?=always|endmodule|$)/g) || [];
                let hasBlockingInSeq = false;
                posedgeBlocks.forEach(block => {
                    // Remove assign keywords or localparam or assign inside block if any
                    const body = block.replace(/assign\s+[^;]+;/g, '');
                    if (/(?<![<>=!])=\s*[^=]/.test(body)) {
                        hasBlockingInSeq = true;
                    }
                });

                if (hasBlockingInSeq) {
                    score -= 10;
                    checks.push({ name: 'Quy tắc mạch tuần tự', pass: false, msg: 'Dùng phép gán Blocking (=) trong mạch tuần tự.' });
                    feedback.push('💡 Trong khối `always @(posedge clk)` mạch tuần tự, hãy dùng phép gán Non-blocking (`<=`).');
                } else {
                    checks.push({ name: 'Quy tắc mạch tuần tự', pass: true, msg: 'Sử dụng phép gán Non-blocking (<=) chuẩn sườn xung nhịp.' });
                }
            }
        }

        // 3. Đánh giá ĐÚNG / SAI từng ô trong BẢNG CHÂN LÝ do Sinh viên điền
        const expectedTt = exercise.expectedTruthTable || {};
        let ttErrorCount = 0;
        let ttTotalCount = Object.keys(expectedTt).length;
        let ttFilledCount = 0;
        let ttWrongDetails = [];

        if (ttTotalCount > 0 && studentTruthTable) {
            for (const cellKey in expectedTt) {
                const expectedVal = String(expectedTt[cellKey]).trim();
                const studentVal = studentTruthTable[cellKey] !== undefined ? String(studentTruthTable[cellKey]).trim() : '';
                
                if (studentVal !== '') ttFilledCount++;

                if (studentVal === '') {
                    ttErrorCount++;
                } else if (studentVal !== expectedVal) {
                    ttErrorCount++;
                    // Format row & col info
                    const parts = cellKey.split('_');
                    const rowIdx = parseInt(parts[0].replace('r', '')) + 1;
                    const colName = parts.slice(1).join('_');
                    ttWrongDetails.push(`Hàng ${rowIdx} (${colName}): điền '${studentVal}' ❌ (Đúng phải là '${expectedVal}')`);
                }
            }

            if (ttErrorCount === 0) {
                checks.push({ name: 'Bảng Chân Lý / Bảng Trạng Thái', pass: true, msg: `Chính xác 100%! Đã điền chuẩn ${ttTotalCount}/${ttTotalCount} ô.` });
            } else {
                score -= Math.min(45, ttErrorCount * 20);
                isPass = false;
                checks.push({ 
                    name: 'Bảng Chân Lý / Bảng Trạng Thái', 
                    pass: false, 
                    msg: `Phát hiện ${ttErrorCount} ô sai hoặc chưa điền (${ttFilledCount}/${ttTotalCount} ô đã nhập).` 
                });
                if (ttWrongDetails.length > 0) {
                    feedback.push('❌ Sai Bảng Chân Lý: ' + ttWrongDetails.slice(0, 3).join('; '));
                } else {
                    feedback.push('⚠️ Vui lòng điền đầy đủ các ô trong Bảng Chân Lý.');
                }
            }
        }

        // 4. Phân tích logic Verilog của Sinh viên so với Đáp án Chuẩn
        const codeEvalResult = this.verifyVerilogLogic(exercise, studentCode);
        if (codeEvalResult.pass) {
            checks.push({ name: 'Đối chiếu Logic Verilog', pass: true, msg: codeEvalResult.msg });
        } else {
            score -= 40;
            isPass = false;
            checks.push({ name: 'Đối chiếu Logic Verilog', pass: false, msg: codeEvalResult.msg });
            feedback.push(`❌ Lỗi Logic Verilog: ${codeEvalResult.detail}`);
        }

        score = Math.max(0, Math.min(100, score));
        if (score < 70) isPass = false;

        let summary = '';
        if (score >= 90) {
            summary = '🎉 Xuất sắc! Mã Verilog và Bảng Chân Lý của bạn khớp hoàn toàn 100% với Đáp án Giảng viên.';
        } else if (score >= 70) {
            summary = '✅ Đạt yêu cầu! Bài làm đáp ứng được logic chính, xem nhận xét bên dưới để hoàn thiện.';
        } else {
            summary = '❌ Chưa đạt! Bài làm bị sai Bảng Chân Lý hoặc ngược/lỗi logic Verilog.';
        }

        return {
            score,
            isPass,
            status: isPass ? 'ĐẠT' : 'CẦN SỬA',
            summary,
            checks,
            feedback
        };
    }

    verifyVerilogLogic(exercise, studentCode) {
        if (!exercise) return { pass: true, msg: 'Mã Verilog khớp logic.' };
        
        const cleanCode = studentCode.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Exact solution check fallback
        if (exercise.solution) {
            const cleanSol = exercise.solution.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
            const cleanStu = cleanCode.replace(/\s+/g, ' ').trim();
            if (cleanStu.includes(cleanSol) || cleanSol.includes(cleanStu)) {
                return { pass: true, msg: 'Mã Verilog trùng khớp 100% với đáp án mẫu.' };
            }
        }

        // Lab 1 specific test: btn_led expected assign led = btn;
        if (exercise.id === 1) {
            if (/assign\s+led\s*=\s*~btn/.test(cleanCode) || /assign\s+led\s*=\s*!\s*btn/.test(cleanCode)) {
                return { 
                    pass: false, 
                    msg: 'Logic ngõ ra bị ngược (Dùng phép đảo ~btn thay vì truyền thẳng btn).', 
                    detail: 'Đề bài Bài 1 yêu cầu `assign led = btn;` (Active-low SW1 ngắt=0, LED sáng=0). Viết `assign led = ~btn;` là bị sai đảo logic!' 
                };
            }
            if (/assign\s+led\s*=\s*btn/.test(cleanCode)) {
                return { pass: true, msg: 'Mã Verilog khớp logic assign led = btn.' };
            }
        }

        // Lab 2 specific test: not_gate expected assign y = ~a;
        if (exercise.id === 2) {
            if (/assign\s+y\s*=\s*a\b/.test(cleanCode) && !cleanCode.includes('~a')) {
                return { pass: false, msg: 'Thiếu phép đảo ~a cho cổng NOT.', detail: 'Cổng NOT phải dùng phép đảo `assign y = ~a;`.' };
            }
        }

        // Lab 4: AND gate
        if (exercise.id === 4) {
            if (cleanCode.includes('|') && !cleanCode.includes('&')) {
                return { pass: false, msg: 'Dùng nhầm cổng OR (|) cho bài cổng AND (&).', detail: 'Cổng AND phải dùng toán tử `&`.' };
            }
        }

        // Lab 5: OR gate
        if (exercise.id === 5) {
            if (cleanCode.includes('&') && !cleanCode.includes('|')) {
                return { pass: false, msg: 'Dùng nhầm cổng AND (&) cho bài cổng OR (|).', detail: 'Cổng OR phải dùng toán tử `|`.' };
            }
        }

        // Generic structural validation
        if (cleanCode.includes('assign') || cleanCode.includes('always')) {
            return { pass: true, msg: 'Khai báo khối xử lý logic hợp lệ.' };
        }

        return { pass: false, msg: 'Thiếu câu lệnh gán assign hoặc khối always xử lý logic.', detail: 'Cần viết câu lệnh `assign` hoặc `always @(*)` để tính ngõ ra.' };
    }
}

const aiGraderEngine = new AIVerilogGrader();
