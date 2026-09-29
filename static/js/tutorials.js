/**
 * VERILOG TUTORIALS 1, 2, 3 & CHEAT SHEETS DATASET
 * Hệ Thống BÀI HỌC LÝ THUYẾT & TỔNG HỢP KIẾN THỨC LẬP TRÌNH VERILOG Tang Nano 9K
 */

const VERILOG_TUTORIALS = [
    {
        id: "tut-1",
        number: 1,
        title: "Tutorial 1: Cấu trúc cơ bản Verilog HDL & Testbench",
        subtitle: "Khởi đầu với Ngôn ngữ Mô tả Phần cứng, Khai báo Module, Cổng Logic & Mô phỏng",
        badge: "Căn Bản",
        summary: "Nắm vững cú pháp Verilog cơ bản, sự khác biệt wire/reg, continuous assignment và cách viết Testbench mô phỏng sóng.",
        sections: [
            {
                title: "1. Khái niệm HDL & Khác biệt với C/C++",
                content: `
                    <p><b>Hardware Description Language (HDL)</b> là ngôn ngữ được thiết kế để mô tả cấu trúc, hành vi và kết nối của các vi mạch số (Digital Hardware). Khác hoàn toàn với lập trình phần mềm (C/C++, Python) vốn thực thi lệnh <i>tuần tự</i> từng dòng trên một CPU, Verilog mô tả các khối phần cứng hoạt động <b>song song (concurrent)</b> và liên tục trong không gian chip FPGA.</p>
                    <div class="code-block-header">Bảng so sánh C/C++ vs Verilog HDL</div>
                    <table class="data-table">
                        <thead>
                            <tr><th>Tiêu chí</th><th>Lập trình C/C++</th><th>Lập trình Verilog HDL</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Bản chất</td><td>Thực thi dòng lệnh tuần tự trên CPU</td><td>Mô tả sơ đồ mạch logic phần cứng song song</td></tr>
                            <tr><td>Thực thi</td><td>1 câu lệnh tại 1 thời điểm nhịp xung</td><td>Hàng ngàn cổng logic chuyển trạng thái đồng thời</td></tr>
                            <tr><td>Đơn vị cấu trúc</td><td>Function / Class</td><td>Module (đầu vào input, đầu ra output)</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int, float, char, pointer</td><td>wire (dây dẫn), reg (lưu trữ/latch/flip-flop)</td></tr>
                            <tr><td>Biên dịch</td><td>Sinh mã máy Assembly/Binary (.exe)</td><td>Tổng hợp (Synthesis) ra các cổng LUT & Flip-Flop (.fs bitstream)</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                title: "2. Cấu trúc một Module Verilog chuẩn",
                content: `
                    <p>Mọi thiết kế Verilog đều được đóng gói trong một <code>module ... endmodule</code>. Dưới đây là cấu trúc khai báo module chuẩn:</p>
                    <pre><code class="language-verilog">// Khai báo Module cổng logic AND/OR đơn giản
module logic_demo (
    input  wire a,      // Tín hiệu ngõ vào a
    input  wire b,      // Tín hiệu ngõ vào b
    output wire y_and,  // Ngõ ra logic AND
    output wire y_or    // Ngõ ra logic OR
);

    // Gán liên tục bằng từ khóa assign
    assign y_and = a & b; // Phép AND logic
    assign y_or  = a | b; // Phép OR logic

endmodule</code></pre>
                    <div class="tip-box">
                        <strong>📌 Lưu ý cực kỳ quan trọng:</strong> Tên module trong file Verilog <code>.v</code> nên trùng khớp với tên module được gọi top trong thiết kế. Mọi câu lệnh <code>assign</code> đều hoạt động liên tục (continuous assignment) — khi <code>a</code> hoặc <code>b</code> thay đổi, <code>y_and</code> và <code>y_or</code> lập tức cập nhật giá trị mới.
                    </div>
                `
            },
            {
                title: "3. Phân biệt Wire và Reg trong Verilog",
                content: `
                    <p>Verilog chia tín hiệu thành 2 nhóm chính: <b>wire</b> và <b>reg</b>.</p>
                    <ul>
                        <li><b>wire (Dây dẫn):</b> Dùng để kết nối tín hiệu giữa các khối logic. <code>wire</code> không lưu trữ giá trị. Bắt buộc dùng <code>wire</code> ở vế trái phép gán <code>assign</code> và các kết nối ngõ vào <code>input</code>.</li>
                        <li><b>reg (Thanh ghi lưu trữ):</b> Dùng để lưu giữ giá trị trong các khối hành vi <code>always</code> hoặc <code>initial</code>. Khi tổng hợp mạch (Synthesis), <code>reg</code> có thể biến thành <b>Flip-Flop</b> (mạch tuần tự) hoặc <b>Latch</b> hoặc chỉ đơn thuần là tín hiệu tổ hợp nội bộ.</li>
                    </ul>
                    <pre><code class="language-verilog">reg [7:0] counter; // Khai báo vector 8-bit reg (từ bit 7 đến bit 0)
wire [3:0] bus_a;  // Khai báo bus 4-bit wire</code></pre>
                `
            },
            {
                title: "4. Cấu trúc Testbench & Mô Phỏng Sóng Waveform",
                content: `
                    <p><b>Testbench</b> là một module Verilog không có ngõ vào/ra dùng để cấp tín hiệu kích thích (stimulus) và quan sát dạng sóng ngõ ra của module cần kiểm thử (UUT - Unit Under Test).</p>
                    <pre><code class="language-verilog">\`timescale 1ns/1ns

module tb_logic_demo;
    // Tín hiệu mô phỏng ngõ vào dùng reg, ngõ ra dùng wire
    reg  tb_a;
    reg  tb_b;
    wire tb_and;
    wire tb_or;

    // Kết nối module cần test (UUT)
    logic_demo uut (
        .a(tb_a),
        .b(tb_b),
        .y_and(tb_and),
        .y_or(tb_or)
    );

    // Khối phát xung và kích thích
    initial begin
        // Ghi nhận dạng sóng vào file dump.vcd
        $dumpfile("dump.vcd");
        $dumpvars(0, tb_logic_demo);
        $monitor("Time=%0t | a=%b b=%b | AND=%b OR=%b", $time, tb_a, tb_b, tb_and, tb_or);

        // Kịch bản kiểm thử
        tb_a = 0; tb_b = 0; #10; // Chờ 10ns
        tb_a = 0; tb_b = 1; #10;
        tb_a = 1; tb_b = 0; #10;
        tb_a = 1; tb_b = 1; #10;

        $finish; // Kết thúc mô phỏng
    end
endmodule</code></pre>
                `
            }
        ]
    },
    {
        id: "tut-2",
        number: 2,
        title: "Tutorial 2: Tổng hợp Mạch Tổ Hợp & Chống Sinh Latch",
        subtitle: "Combinational Logic Synthesis, Câu lệnh if-else, case & Quy tắc thiết kế sạch",
        badge: "Tổ Hợp",
        summary: "Hướng dẫn thiết kế mạch tổ hợp bằng assign và always @(*), cách dùng if-else/case chuẩn và quy tắc phòng tránh sinh Latch ngoài ý muốn.",
        sections: [
            {
                title: "1. Mạch Tổ Hợp (Combinational Logic) là gì?",
                content: `
                    <p>Mạch tổ hợp là mạch số có trạng thái các ngõ ra tại thời điểm <code>t</code> chỉ phụ thuộc duy nhất vào giá trị các ngõ vào tại chính thời điểm <code>t</code> đó: \\(y(t) = f(x(t))\\). Mạch tổ hợp <b>không có bộ nhớ lưu trữ</b> và không cần xung nhịp đồng hồ clock.</p>
                    <p>Các dạng mạch tổ hợp phổ biến: Cổng logic, Bộ cộng (Adder), Bộ so sánh (Comparator), Bộ chọn kênh (MUX), Bộ giải mã (Decoder), Bộ mã hóa ưu tiên (Encoder).</p>
                `
            },
            {
                title: "2. Phong cách viết Mạch Tổ Hợp trong Verilog",
                content: `
                    <p>Trong Verilog, có 2 phong cách chính để viết mạch tổ hợp:</p>
                    <ol>
                        <li><b>Dataflow style (Phép gán liên tục assign):</b> Dùng cho các biểu thức logic ngắn, đơn giản.
                            <pre><code class="language-verilog">assign y = (sel == 1'b0) ? a : b; // MUX 2-1 dùng toán tử điều kiện</code></pre>
                        </li>
                        <li><b>Behavioral style (Khối always @(*)):</b> Dùng cho logic phức tạp có câu lệnh <code>if-else</code> hoặc <code>case</code>.
                            <pre><code class="language-verilog">always @(*) begin
    if (sel == 1'b0)
        y = a;
    else
        y = b;
end</code></pre>
                        </li>
                    </ol>
                    <div class="note-box">
                        <strong>⚠️ Quy tắc phép gán:</strong> Trong khối <code>always @(*)</code> tổ hợp, bắt buộc sử dụng phép gán <b>Blocking (=)</b>, tuyệt đối không dùng phép gán Non-blocking (<=).
                    </div>
                `
            },
            {
                title: "3. Quy tắc Vàng: Phòng chống sinh Latch ngoài ý muốn (Unintentional Latches)",
                content: `
                    <p><b>Latch (Chốt lưu trữ):</b> Khi biên dịch Verilog cho mạch tổ hợp, nếu trình biên dịch (Gowin EDA) phát hiện một trường hợp ngõ vào mà giá trị ngõ ra <i>không được gán</i>, nó sẽ tự động chốt giữ giá trị cũ và sinh ra một Latch phần cứng. Latch tạo ra timing hazards, làm suy giảm tần số hoạt động và sinh ra cảnh báo (Warning) nguy hiểm.</p>
                    <p><b>Cách phòng tránh Latch 100%:</b></p>
                    <ul>
                        <li><b>Quy tắc 1:</b> Gán giá trị mặc định cho TẤT CẢ các ngõ ra ngay ở dòng đầu tiên của khối <code>always @(*)</code>.</li>
                        <li><b>Quy tắc 2:</b> Trong lệnh <code>if</code>, luôn cung cấp nhánh <code>else</code> hoàn chỉnh.</li>
                        <li><b>Quy tắc 3:</b> Trong lệnh <code>case</code>, luôn cung cấp trường hợp <code>default:</code> bao quát mọi trạng thái còn lại.</li>
                    </ul>
                    <div class="code-block-header">Ví dụ Code Chuẩn Không Sinh Latch</div>
                    <pre><code class="language-verilog">// VÍ DỤ ĐÚNG - Khóa Latch bằng Default Values
module decoder_2to4 (
    input  wire [1:0] in,
    input  wire en,
    output reg  [3:0] out
);

    always @(*) begin
        out = 4'b0000; // Gán giá trị mặc định trước!
        if (en) begin
            case (in)
                2'b00: out = 4'b0001;
                2'b01: out = 4'b0010;
                2'b10: out = 4'b0100;
                2'b11: out = 4'b1000;
                default: out = 4'b0000; // Nhánh default bắt buộc
            endcase
        end
    end

endmodule</code></pre>
                `
            }
        ]
    },
    {
        id: "tut-3",
        number: 3,
        title: "Tutorial 3: Mạch Tuần Tự & Chuẩn Thiết Kế FSM 3 Khối",
        subtitle: "Sequential Logic, Edge Triggering, Blocking vs Non-Blocking & Finite State Machines",
        badge: "FSM & Tuần Tự",
        summary: "Nắm vững nguyên lý mạch tuần tự kích hoạt sườn clock, phân biệt phép gán = và <=, và chuẩn hóa thiết kế máy trạng thái FSM 3 khối.",
        sections: [
            {
                title: "1. Mạch Tuần Tự (Sequential Logic) & Kích Hoạt Sườn Clock",
                content: `
                    <p>Mạch tuần tự là mạch số có ngõ ra phụ thuộc vào ngõ vào hiện tại VÀ <b>trạng thái quá khứ</b> được lưu trong các linh kiện nhớ (Flip-Flops). Mạch tuần tự hoạt động đồng bộ theo nhịp <b>xung clock</b> (Edge-triggered clock).</p>
                    <p>Cú pháp Verilog bắt sườn xung clock và reset:</p>
                    <pre><code class="language-verilog">// Khối always mạch tuần tự bắt sườn dương clock (posedge clk) và sườn âm reset (negedge rst_n)
always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        q <= 1'b0; // Reset bất đồng bộ tích cực thấp
    end else begin
        q <= d;    // Cập nhật ngõ ra theo ngõ vào d tại sườn dương clk
    end
end</code></pre>
                `
            },
            {
                title: "2. Quy tắc Phép gán Blocking (=) vs Non-Blocking (<=)",
                content: `
                    <p>Đây là quy tắc quan trọng bậc nhất trong lập trình Verilog chuyên nghiệp:</p>
                    <table class="data-table">
                        <thead>
                            <tr><th>Phép gán</th><th>Ký hiệu</th><th>Khối áp dụng</th><th>Ý nghĩa hoạt động phần cứng</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><b>Blocking</b></td><td><code>=</code></td><td>Mạch tổ hợp <code>always @(*)</code></td><td>Gán tức thì theo thứ tự dòng code (như biến C)</td></tr>
                            <tr><td><b>Non-Blocking</b></td><td><code><=</code></td><td>Mạch tuần tự <code>always @(posedge clk)</code></td><td>Tất cả Flip-Flops cập nhật đồng thời tại sườn xung nhịp</td></tr>
                        </tbody>
                    </table>
                    <div class="note-box">
                        <strong>⚠️ Cảnh báo chết người:</strong> Tuyệt đối KHÔNG trộn lẫn phép gán <code>=</code> và <code><=</code> trong cùng một khối <code>always</code>!
                    </div>
                `
            },
            {
                title: "3. Kiến trúc Máy Trạng Thái Hữu Hạn (FSM - Finite State Machine)",
                content: `
                    <p>Máy trạng thái hữu hạn (FSM) là mô hình thiết kế trung tâm của mọi vi xử lý và bộ điều khiển nhúng trên FPGA. FSM bao gồm tập hợp các <b>Trạng thái (States)</b>, <b>Chuyển trạng thái (Transitions)</b> và <b>Đầu ra (Outputs)</b>.</p>
                    <ul>
                        <li><b>Moore FSM:</b> Đầu ra chỉ phụ thuộc duy nhất vào Trạng thái Hiện tại (Current State). Đầu ra ổn định, không có xung nhiễu (glitch).</li>
                        <li><b>Mealy FSM:</b> Đầu ra phụ thuộc vào cả Trạng thái Hiện tại VÀ Ngõ vào Hiện tại (Inputs). Phản ứng nhanh hơn 1 chu kỳ clock nhưng có thể bị glitch.</li>
                    </ul>
                `
            },
            {
                title: "4. Chuẩn Thiết Kế FSM 3 Khối (3-Always-Block Style)",
                content: `
                    <p>Để code FSM dễ đọc, không lỗi timing và tổng hợp tối ưu trên Tang Nano 9K, học phần quy định sử dụng <b>Mô hình 3 khối Always</b> chuẩn công nghiệp:</p>
                    <div class="fsm-box">
                        [Khối 1: Register State (Sequential)] ---> Cập nhật current_state <= next_state tại posedge clk<br>
                        [Khối 2: Next State Logic (Combinational)] ---> Tính next_state từ current_state và inputs (using case)<br>
                        [Khối 3: Output Logic (Combinational/Sequential)] ---> Tính outputs từ current_state
                    </div>
                    <div class="code-block-header">Mã Verilog Mẫu FSM 3 Khối Chẩn Chuẩn</div>
                    <pre><code class="language-verilog">module fsm_3block (
    input  wire clk,
    input  wire rst_n,
    input  wire in_bit,
    output reg  out_flag
);

    // 1. Mã hóa trạng thái dùng localparam hoặc enum
    localparam STATE_IDLE = 2'b00;
    localparam STATE_RUN  = 2'b01;
    localparam STATE_DONE = 2'b10;

    reg [1:0] current_state, next_state;

    // ----- KHỐI 1: Chuyển trạng thái đồng bộ (Sequential) -----
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            current_state <= STATE_IDLE;
        else
            current_state <= next_state;
    end

    // ----- KHỐI 2: Tính trạng thái kế tiếp (Combinational) -----
    always @(*) begin
        next_state = current_state; // Default state
        case (current_state)
            STATE_IDLE: begin
                if (in_bit) next_state = STATE_RUN;
            end
            STATE_RUN: begin
                if (!in_bit) next_state = STATE_DONE;
            end
            STATE_DONE: begin
                next_state = STATE_IDLE;
            end
            default: next_state = STATE_IDLE;
        endcase
    end

    // ----- KHỐI 3: Tính toán đầu ra (Combinational Output) -----
    always @(*) begin
        out_flag = 1'b0; // Default output
        if (current_state == STATE_DONE) begin
            out_flag = 1'b1;
        end
    end

endmodule</code></pre>
                `
            }
        ]
    }
];

const CHEAT_SHEETS = [
    {
        title: "Toán Tử Verilog Thường Dùng",
        items: [
            { op: "&, |, ~, ^", desc: "Toán tử Logic Bitwise (AND, OR, NOT, XOR)" },
            { op: "&&, ||, !", desc: "Toán tử Logic Mệnh đề (Logical AND, OR, NOT)" },
            { op: "+, -, *, /, %", desc: "Toán tử Số học (Cộng, Trừ, Nhân, Chia, Lấy dư)" },
            { op: "<<, >>", desc: "Dịch bit Trái, Dịch bit Phải (Shift Left/Right)" },
            { op: "==, !=, >, <, >=, <=", desc: "Toán tử So sánh Quan hệ" },
            { op: "{a, b}", desc: "Toán tử Ghép Bus (Concatenation: {a[3:0], b[3:0]})" },
            { op: "{4{a}}", desc: "Toán tử Lặp Bit (Replication: {4{1'b1}} -> 4'b1111)" },
            { op: "cond ? val1 : val2", desc: "Toán tử Điều kiện MUX (Ternary Operator)" }
        ]
    },
    {
        title: "Kit Tang Nano 9K Hardware Reference",
        items: [
            { op: "PIN 52", desc: "Clock thạch anh hệ thống 27MHz" },
            { op: "PIN 3 (btn1), PIN 4 (btn2)", desc: "Nút nhấn Onboard SW1, SW2 (Active-Low: Nhấn=0, Thả=1)" },
            { op: "PIN 10, 11, 13, 14, 15, 16", desc: "Dải 6 LED Onboard (Active-Low: 出0=Sáng, 出1=Tắt)" },
            { op: "PIN 17 (TX), PIN 18 (RX)", desc: "Cổng UART truyền nhận dữ liệu USB-Serial 115200/9600 baud" },
            { op: "Bank Voltage", desc: "PIN 3,4,10..16 thuộc I/O Bank 1.8V/3.3V (LVCMOS18 / LVCMOS33)" }
        ]
    }
];
