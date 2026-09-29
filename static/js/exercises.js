const FPGA_EXERCISES = [
  {
    "id": 1,
    "slug": "bai-01-btn-led",
    "title": "Bài 01: Mạch logic I/O cơ bản: Nút nhấn điều khiển LED",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế module `btn_led` kết nối nút nhấn SW1 (PIN 3) ra LED0 (PIN 10) trên Tang Nano 9K. Phân tích nguyên lý cực tính Active-Low.",
    "analysis": "Nút nhấn SW1 ngắt mạch mở pull-up (Active-Low: Nhấn=0, Thả=1). LED0 nối Anode lên VCC (Active-Low: Xuất 0=Sáng, Xuất 1=Tắt). Khi nhấn SW1 (0), ta muốn LED0 sáng (0). Vậy tín hiệu truyền thẳng `led = btn`.",
    "cst": "IO_LOC \"btn\" 3; IO_PORT \"btn\" IO_TYPE=LVCMOS18 PULL_MODE=UP;\nIO_LOC \"led\" 10; IO_PORT \"led\" IO_TYPE=LVCMOS18 DRIVE=8;",
    "truthTable": [
      {
        "btn": "1 (Thả)",
        "led": "1 (Tắt LED)",
        "note": "Trạng thái nghỉ"
      },
      {
        "btn": "0 (Nhấn)",
        "led": "0 (Sáng LED)",
        "note": "Nhấn nút LED sáng"
      }
    ],
    "template": "module btn_led (\n    input wire btn,  // SW1 (Pin 3, Active-Low)\n    output wire led  // LED0 (Pin 10, Active-Low)\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Gợi ý: Gán trực tiếp tín hiệu nút nhấn ra LED\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg btn;\n    wire led;\n\n    btn_led uut (.btn(btn), .led(led));\n\n    initial begin\n        $dumpfile(\"dump.vcd\");\n        $dumpvars(0, tb);\n        $monitor(\"Time=%0t | btn=%b | led=%b\", $time, btn, led);\n        \n        btn = 1; #10;\n        btn = 0; #10;\n        btn = 1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module btn_led (\n    input wire btn,\n    output wire led\n);\n    assign led = btn;\nendmodule",
    "simInputs": [
      {
        "id": "btn",
        "label": "SW1 (PIN 3)",
        "default": false
      }
    ],
    "simOutputs": [
      {
        "id": "led",
        "label": "LED0 (PIN 10)",
        "inverted": true
      }
    ],
    "simType": "comb",
    "evalFn": "return { led: inputs.btn ? 1 : 0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 1: GÁN TRỰC TIẾP DỮ LIỆU\nmodule example_assign (\n    input wire a,\n    output wire y\n);\n    assign y = a; // Gán ngõ ra y bằng giá trị ngõ vào a\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "SW1 (Pin 3)": "0"
        },
        "out": {
          "LED0 (Pin 10)": ""
        }
      },
      {
        "in": {
          "SW1 (Pin 3)": "1"
        },
        "out": {
          "LED0 (Pin 10)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_LED0 (Pin 10)": "0",
      "r1_LED0 (Pin 10)": "1"
    }
  },
  {
    "id": 2,
    "slug": "bai-02-not-gate",
    "title": "Bài 02: Cổng NOT – Đảo logic một đầu vào",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế cổng NOT thực hiện phép đảo logic nút nhấn SW1 ra LED0. Phân tích nguyên lý đảo mức tín hiệu nội bộ.",
    "analysis": "Ngõ vào `a` nhận trạng thái nút nhấn. Ngõ ra `y` = ~`a`. Khi thả nút (a=1), y=0 (LED sáng). Khi nhấn nút (a=0), y=1 (LED tắt).",
    "cst": "IO_LOC \"a\" 3; IO_PORT \"a\" IO_TYPE=LVCMOS18 PULL_MODE=UP;\nIO_LOC \"y\" 10; IO_PORT \"y\" IO_TYPE=LVCMOS18 DRIVE=8;",
    "truthTable": [
      {
        "a": "0",
        "y": "1"
      },
      {
        "a": "1",
        "y": "0"
      }
    ],
    "template": "module not_gate (\n    input wire a,  // Nút nhấn A (SW1)\n    output wire y  // Ngõ ra cổng NOT\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Gợi ý: Dùng toán tử đảo logic ~\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a;\n    wire y;\n\n    not_gate uut (.a(a), .y(y));\n\n    initial begin\n        $dumpfile(\"dump.vcd\");\n        $dumpvars(0, tb);\n        $monitor(\"Time=%0t | a=%b | y=%b\", $time, a, y);\n        a = 0; #10;\n        a = 1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module not_gate (\n    input wire a,\n    output wire y\n);\n    assign y = ~a;\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Nút A (SW1)",
        "default": false
      }
    ],
    "simOutputs": [
      {
        "id": "y",
        "label": "Cổng NOT Output Y",
        "inverted": false
      }
    ],
    "simType": "comb",
    "evalFn": "return { y: inputs.a ? 0 : 1 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 2: PHÉP ĐẢO LOGIC NOT (~)\nmodule example_not (\n    input wire in_sig,\n    output wire out_sig\n);\n    assign out_sig = ~in_sig; // Phép đảo logic: 0 thành 1, 1 thành 0\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "Nút A (SW1)": "0"
        },
        "out": {
          "Cổng NOT (y)": ""
        }
      },
      {
        "in": {
          "Nút A (SW1)": "1"
        },
        "out": {
          "Cổng NOT (y)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_Cổng NOT (y)": "1",
      "r1_Cổng NOT (y)": "0"
    }
  },
  {
    "id": 3,
    "slug": "bai-34-toggle-btn-led",
    "title": "Bài 03: Nút nhấn Toggle SW1 đảo trạng thái bật/tắt dải LED",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế mạch đảo trạng thái LED (Toggle LED): Mỗi lần nhấn nút SW1, LED chuyển đổi trạng thái từ TẮT sang SÁNG hoặc ngược lại.",
    "analysis": "Dùng sườn âm của nút nhấn `negedge btn` hoặc mạch phát hiện sườn nút để đảo `led_state <= ~led_state`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"btn\" 3;\nIO_LOC \"led\" 10;",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 3: GÁN NHIỀU NGÕ RA\nmodule example_dual_output (\n    input wire in_btn,\n    output wire out_a,\n    output wire out_b\n);\n    assign out_a = in_btn;\n    assign out_b = ~in_btn;\nendmodule",
    "template": "module toggle_leds (\n    input wire btn,    // SW1\n    output wire led0,  // Theo cực btn\n    output wire led1   // Đảo cực ~btn\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, btn; wire led;\n    toggle_btn_led uut (.clk(clk), .rst_n(rst_n), .btn(btn), .led(led));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; btn=1; #12; rst_n=1;\n        btn=0; #20; btn=1; #20; btn=0; #20;\n        $finish;\n    end\nendmodule",
    "solution": "module toggle_leds (\n    input wire btn,\n    output wire led0,\n    output wire led1\n);\n    assign led0 = btn;\n    assign led1 = ~btn;\nendmodule",
    "simInputs": [
      {
        "id": "btn",
        "label": "Nút SW1"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "led",
        "label": "LED Toggle"
      }
    ],
    "simType": "clock",
    "evalFn": "if (!inputs.rst_n) return {led:0}; const prevBtn = env.prev.btn || false; const isPress = (!inputs.btn && prevBtn); const prevLed = env.prev.led || 0; return {led: isPress ? (prevLed?0:1) : prevLed};",
    "fillableTruthTable": [
      {
        "in": {
          "btn": "0"
        },
        "out": {
          "led0": "",
          "led1": ""
        }
      },
      {
        "in": {
          "btn": "1"
        },
        "out": {
          "led0": "",
          "led1": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_led0": "0",
      "r0_led1": "1",
      "r1_led0": "1",
      "r1_led1": "0"
    }
  },
  {
    "id": 4,
    "slug": "bai-03-and-gate",
    "title": "Bài 04: Cổng AND – Phép nhân logic 2 ngõ vào",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế cổng AND nhận 2 ngõ vào nút nhấn SW1, SW2 và xuất ra LED0. Ngõ ra chỉ bằng 1 khi cả 2 ngõ vào đều bằng 1.",
    "analysis": "Cổng AND thực hiện phép nhân logic: `y = a & b`. Chỉ khi cả A và B tích cực (bằng 1), Y mới xuất 1.",
    "cst": "IO_LOC \"a\" 3; IO_PORT \"a\" IO_TYPE=LVCMOS18;\nIO_LOC \"b\" 4; IO_PORT \"b\" IO_TYPE=LVCMOS18;\nIO_LOC \"y\" 10; IO_PORT \"y\" IO_TYPE=LVCMOS18;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "y": "0"
      },
      {
        "a": "0",
        "b": "1",
        "y": "0"
      },
      {
        "a": "1",
        "b": "0",
        "y": "0"
      },
      {
        "a": "1",
        "b": "1",
        "y": "1"
      }
    ],
    "template": "module and_gate (\n    input wire a,\n    input wire b,\n    output wire y\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Phép nhân logic AND dùng toán tử &\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b; wire y;\n    and_gate uut (.a(a), .b(b), .y(y));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; #10;\n        a=0; b=1; #10;\n        a=1; b=0; #10;\n        a=1; b=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module and_gate (\n    input wire a,\n    input wire b,\n    output wire y\n);\n    assign y = a & b;\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Công tắc A"
      },
      {
        "id": "b",
        "label": "Công tắc B"
      }
    ],
    "simOutputs": [
      {
        "id": "y",
        "label": "Ngõ ra Y (AND)"
      }
    ],
    "simType": "comb",
    "evalFn": "return { y: (inputs.a && inputs.b) ? 1 : 0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 4: CỔNG AND (&)\nmodule example_and (\n    input wire in1, in2,\n    output wire out_and\n);\n    assign out_and = in1 & in2;\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1"
        },
        "out": {
          "y": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y": "0",
      "r1_y": "0",
      "r2_y": "0",
      "r3_y": "1"
    }
  },
  {
    "id": 5,
    "slug": "bai-04-or-gate",
    "title": "Bài 05: Cổng OR – Phép cộng logic 2 ngõ vào",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế cổng OR nhận 2 tín hiệu ngõ vào A, B và tạo ngõ ra Y. Ngõ ra Y bằng 1 khi ít nhất 1 ngõ vào bằng 1.",
    "analysis": "Cổng OR thực hiện phép cộng logic: `y = a | b`. Nếu A=1 hoặc B=1 thì Y=1.",
    "cst": "IO_LOC \"a\" 3; IO_PORT \"a\" IO_TYPE=LVCMOS18;\nIO_LOC \"b\" 4; IO_PORT \"b\" IO_TYPE=LVCMOS18;\nIO_LOC \"y\" 10; IO_PORT \"y\" IO_TYPE=LVCMOS18;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "y": "0"
      },
      {
        "a": "0",
        "b": "1",
        "y": "1"
      },
      {
        "a": "1",
        "b": "0",
        "y": "1"
      },
      {
        "a": "1",
        "b": "1",
        "y": "1"
      }
    ],
    "template": "module or_gate (\n    input wire a,\n    input wire b,\n    output wire y\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Phép cộng logic OR dùng toán tử |\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b; wire y;\n    or_gate uut (.a(a), .b(b), .y(y));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; #10; a=0; b=1; #10;\n        a=1; b=0; #10; a=1; b=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module or_gate (\n    input wire a,\n    input wire b,\n    output wire y\n);\n    assign y = a | b;\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Công tắc A"
      },
      {
        "id": "b",
        "label": "Công tắc B"
      }
    ],
    "simOutputs": [
      {
        "id": "y",
        "label": "Ngõ ra Y (OR)"
      }
    ],
    "simType": "comb",
    "evalFn": "return { y: (inputs.a || inputs.b) ? 1 : 0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 5: CỔNG OR (|)\nmodule example_or (\n    input wire in1, in2,\n    output wire out_or\n);\n    assign out_or = in1 | in2;\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1"
        },
        "out": {
          "y": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y": "0",
      "r1_y": "1",
      "r2_y": "1",
      "r3_y": "1"
    }
  },
  {
    "id": 6,
    "slug": "bai-05-xor-xnor",
    "title": "Bài 06: Cổng XOR và XNOR – Mạch so sánh chẵn lẻ / tương đương",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế module tính cổng XOR và XNOR của 2 tín hiệu đầu vào A, B. XOR báo 1 khi 2 tín hiệu khác nhau, XNOR báo 1 khi 2 tín hiệu giống nhau.",
    "analysis": "`y_xor = a ^ b`, `y_xnor = ~(a ^ b)`. Cổng XOR rất phổ biến trong bộ cộng và mạch kiểm tra bit chẵn lẻ.",
    "cst": "IO_LOC \"a\" 3; IO_LOC \"b\" 4;\nIO_LOC \"y_xor\" 10; IO_LOC \"y_xnor\" 11;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "y_xor": "0",
        "y_xnor": "1"
      },
      {
        "a": "0",
        "b": "1",
        "y_xor": "1",
        "y_xnor": "0"
      },
      {
        "a": "1",
        "b": "0",
        "y_xor": "1",
        "y_xnor": "0"
      },
      {
        "a": "1",
        "b": "1",
        "y_xor": "0",
        "y_xnor": "1"
      }
    ],
    "template": "module xor_xnor_gate (\n    input wire a,\n    input wire b,\n    output wire y_xor,\n    output wire y_xnor\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // XOR dùng ^, XNOR dùng ~^ hoặc ~(a ^ b)\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b; wire y_xor, y_xnor;\n    xor_xnor uut (.a(a), .b(b), .y_xor(y_xor), .y_xnor(y_xnor));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; #10; a=0; b=1; #10;\n        a=1; b=0; #10; a=1; b=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module xor_xnor_gate (\n    input wire a,\n    input wire b,\n    output wire y_xor,\n    output wire y_xnor\n);\n    assign y_xor = a ^ b;\n    assign y_xnor = ~(a ^ b);\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Công tắc A"
      },
      {
        "id": "b",
        "label": "Công tắc B"
      }
    ],
    "simOutputs": [
      {
        "id": "y_xor",
        "label": "XOR (Khác nhau)"
      },
      {
        "id": "y_xnor",
        "label": "XNOR (Giống nhau)"
      }
    ],
    "simType": "comb",
    "evalFn": "const x = (inputs.a?1:0) ^ (inputs.b?1:0); return { y_xor: x, y_xnor: x?0:1 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 6: CỔNG XOR (^) VÀ XNOR (~^)\nmodule example_xor (\n    input wire in1, in2,\n    output wire out_xor, out_xnor\n);\n    assign out_xor = in1 ^ in2;\n    assign out_xnor = ~(in1 ^ in2);\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0"
        },
        "out": {
          "y_xor": "",
          "y_xnor": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1"
        },
        "out": {
          "y_xor": "",
          "y_xnor": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0"
        },
        "out": {
          "y_xor": "",
          "y_xnor": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1"
        },
        "out": {
          "y_xor": "",
          "y_xnor": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y_xor": "0",
      "r0_y_xnor": "1",
      "r1_y_xor": "1",
      "r1_y_xnor": "0",
      "r2_y_xor": "1",
      "r2_y_xnor": "0",
      "r3_y_xor": "0",
      "r3_y_xnor": "1"
    }
  },
  {
    "id": 7,
    "slug": "bai-06-nand-nor",
    "title": "Bài 07: Cổng NAND và NOR vạn năng",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế hai cổng logic vạn năng NAND và NOR. Chứng minh từ NAND/NOR có thể tổng hợp mọi hàm logic số.",
    "analysis": "`y_nand = ~(a & b)`, `y_nor = ~(a | b)`. Trong công nghệ bán dẫn CMOS, NAND/NOR là các cổng căn bản nhất.",
    "cst": "IO_LOC \"a\" 3; IO_LOC \"b\" 4;\nIO_LOC \"y_nand\" 10; IO_LOC \"y_nor\" 11;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "y_nand": "1",
        "y_nor": "1"
      },
      {
        "a": "0",
        "b": "1",
        "y_nand": "1",
        "y_nor": "0"
      },
      {
        "a": "1",
        "b": "0",
        "y_nand": "1",
        "y_nor": "0"
      },
      {
        "a": "1",
        "b": "1",
        "y_nand": "0",
        "y_nor": "0"
      }
    ],
    "template": "module nand_nor_gate (\n    input wire a,\n    input wire b,\n    output wire y_nand,\n    output wire y_nor\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // NAND: ~(a & b), NOR: ~(a | b)\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b; wire y_nand, y_nor;\n    nand_nor uut (.a(a), .b(b), .y_nand(y_nand), .y_nor(y_nor));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; #10; a=0; b=1; #10;\n        a=1; b=0; #10; a=1; b=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module nand_nor_gate (\n    input wire a,\n    input wire b,\n    output wire y_nand,\n    output wire y_nor\n);\n    assign y_nand = ~(a & b);\n    assign y_nor = ~(a | b);\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Công tắc A"
      },
      {
        "id": "b",
        "label": "Công tắc B"
      }
    ],
    "simOutputs": [
      {
        "id": "y_nand",
        "label": "NAND"
      },
      {
        "id": "y_nor",
        "label": "NOR"
      }
    ],
    "simType": "comb",
    "evalFn": "const nd = !(inputs.a && inputs.b); const nr = !(inputs.a || inputs.b); return { y_nand: nd?1:0, y_nor: nr?1:0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 7: CỔNG NAND VÀ NOR\nmodule example_nand_nor (\n    input wire in1, in2,\n    output wire out_nand, out_nor\n);\n    assign out_nand = ~(in1 & in2);\n    assign out_nor  = ~(in1 | in2);\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0"
        },
        "out": {
          "y_nand": "",
          "y_nor": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1"
        },
        "out": {
          "y_nand": "",
          "y_nor": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0"
        },
        "out": {
          "y_nand": "",
          "y_nor": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1"
        },
        "out": {
          "y_nand": "",
          "y_nor": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y_nand": "1",
      "r0_y_nor": "1",
      "r1_y_nand": "1",
      "r1_y_nor": "0",
      "r2_y_nand": "1",
      "r2_y_nor": "0",
      "r3_y_nand": "0",
      "r3_y_nor": "0"
    }
  },
  {
    "id": 8,
    "slug": "bai-07-combo-2btn-3led",
    "title": "Bài 08: Hàm logic 2 nút 3 LED (Mạch tổ hợp tổng hợp)",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế mạch điều khiển 3 LED dựa trên trạng thái 2 nút bấm: LED0 = A AND B, LED1 = A OR B, LED2 = A XOR B.",
    "analysis": "Kết hợp đồng thời 3 phép toán logic căn bản trên 2 biến đầu vào A và B để điều khiển 3 LED độc lập.",
    "cst": "IO_LOC \"a\" 3; IO_LOC \"b\" 4;\nIO_LOC \"led0\" 10; IO_LOC \"led1\" 11; IO_LOC \"led2\" 13;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "led0": "0",
        "led1": "0",
        "led2": "0"
      },
      {
        "a": "0",
        "b": "1",
        "led0": "0",
        "led1": "1",
        "led2": "1"
      },
      {
        "a": "1",
        "b": "0",
        "led0": "0",
        "led1": "1",
        "led2": "1"
      },
      {
        "a": "1",
        "b": "1",
        "led0": "1",
        "led1": "1",
        "led2": "0"
      }
    ],
    "template": "module comb_logic (\n    input wire btn1,\n    input wire btn2,\n    output wire led0, // AND\n    output wire led1, // OR\n    output wire led2  // XOR\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b; wire l0, l1, l2;\n    combo_leds uut (.a(a), .b(b), .led0(l0), .led1(l1), .led2(l2));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; #10; a=0; b=1; #10;\n        a=1; b=0; #10; a=1; b=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module comb_logic (\n    input wire btn1,\n    input wire btn2,\n    output wire led0,\n    output wire led1,\n    output wire led2\n);\n    assign led0 = btn1 & btn2;\n    assign led1 = btn1 | btn2;\n    assign led2 = btn1 ^ btn2;\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Công tắc A"
      },
      {
        "id": "b",
        "label": "Công tắc B"
      }
    ],
    "simOutputs": [
      {
        "id": "led0",
        "label": "LED0 (AND)"
      },
      {
        "id": "led1",
        "label": "LED1 (OR)"
      },
      {
        "id": "led2",
        "label": "LED2 (XOR)"
      }
    ],
    "simType": "comb",
    "evalFn": "const A = inputs.a?1:0; const B = inputs.b?1:0; return { led0: A&B, led1: A|B, led2: A^B };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 8: MẠCH TỔ HỢP TỔNG HỢP\nmodule example_comb (\n    input wire b1, b2,\n    output wire l0, l1, l2\n);\n    assign l0 = b1 & b2;\n    assign l1 = b1 | b2;\n    assign l2 = b1 ^ b2;\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "btn1": "0",
          "btn2": "0"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": ""
        }
      },
      {
        "in": {
          "btn1": "0",
          "btn2": "1"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": ""
        }
      },
      {
        "in": {
          "btn1": "1",
          "btn2": "0"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": ""
        }
      },
      {
        "in": {
          "btn1": "1",
          "btn2": "1"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_led0": "0",
      "r0_led1": "0",
      "r0_led2": "0",
      "r1_led0": "0",
      "r1_led1": "1",
      "r1_led2": "1",
      "r2_led0": "0",
      "r2_led1": "1",
      "r2_led2": "1",
      "r3_led0": "1",
      "r3_led1": "1",
      "r3_led2": "0"
    }
  },
  {
    "id": 9,
    "slug": "bai-35-2bit-key-selector",
    "title": "Bài 09: Mạch chọn kênh 2 nút bấm SW1, SW2 điều khiển 4 trạng thái LED",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thiết kế mạch nhận 2 nút bấm `sw[1:0]`. Tùy theo mã nhị phân 2 nút bấm mà chọn bật LED tương ứng trong dải 4 LED: 00->LED0, 01->LED1, 10->LED2, 11->LED3.",
    "analysis": "Sử dụng câu lệnh `case(sw)` trong khối `always @(*)` để giải mã 2-bit ngõ vào ra 4 LED.",
    "cst": "IO_LOC \"sw[0]\" 3; IO_LOC \"sw[1]\" 4;\nIO_LOC \"led[0]\" 10; IO_LOC \"led[1]\" 11; IO_LOC \"led[2]\" 13; IO_LOC \"led[3]\" 14;",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 9: BỘ MÃ HÓA NỔI TRẠNG THÁI 2-TO-4\nmodule example_dec2to4 (\n    input wire s1, s0,\n    output wire y0, y1, y2, y3\n);\n    assign y0 = ~s1 & ~s0;\n    assign y1 = ~s1 &  s0;\n    assign y2 =  s1 & ~s0;\n    assign y3 =  s1 &  s0;\nendmodule",
    "template": "module selector_2bit (\n    input wire sw1,\n    input wire sw2,\n    output wire led0,\n    output wire led1,\n    output wire led2,\n    output wire led3\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // sw1 sw2 = 00 -> led0=1; 01 -> led1=1; 10 -> led2=1; 11 -> led3=1\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [1:0] sw; wire [3:0] led;\n    key_selector_4led uut (.sw(sw), .led(led));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        sw=2'b00; #10; sw=2'b01; #10; sw=2'b10; #10; sw=2'b11; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module selector_2bit (\n    input wire sw1,\n    input wire sw2,\n    output wire led0,\n    output wire led1,\n    output wire led2,\n    output wire led3\n);\n    assign led0 = ~sw1 & ~sw2;\n    assign led1 = ~sw1 &  sw2;\n    assign led2 =  sw1 & ~sw2;\n    assign led3 =  sw1 &  sw2;\nendmodule",
    "simInputs": [
      {
        "id": "sw0",
        "label": "SW1 (bit 0)"
      },
      {
        "id": "sw1",
        "label": "SW2 (bit 1)"
      }
    ],
    "simOutputs": [
      {
        "id": "l0",
        "label": "LED0"
      },
      {
        "id": "l1",
        "label": "LED1"
      },
      {
        "id": "l2",
        "label": "LED2"
      },
      {
        "id": "l3",
        "label": "LED3"
      }
    ],
    "simType": "comb",
    "evalFn": "const val = (inputs.sw1?2:0)+(inputs.sw0?1:0); return {l0:val===0?1:0, l1:val===1?1:0, l2:val===2?1:0, l3:val===3?1:0};",
    "fillableTruthTable": [
      {
        "in": {
          "sw1": "0",
          "sw2": "0"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": "",
          "led3": ""
        }
      },
      {
        "in": {
          "sw1": "0",
          "sw2": "1"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": "",
          "led3": ""
        }
      },
      {
        "in": {
          "sw1": "1",
          "sw2": "0"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": "",
          "led3": ""
        }
      },
      {
        "in": {
          "sw1": "1",
          "sw2": "1"
        },
        "out": {
          "led0": "",
          "led1": "",
          "led2": "",
          "led3": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_led0": "1",
      "r0_led1": "0",
      "r0_led2": "0",
      "r0_led3": "0",
      "r1_led0": "0",
      "r1_led1": "1",
      "r1_led2": "0",
      "r1_led3": "0",
      "r2_led0": "0",
      "r2_led1": "0",
      "r2_led2": "1",
      "r2_led3": "0",
      "r3_led0": "0",
      "r3_led1": "0",
      "r3_led2": "0",
      "r3_led3": "1"
    }
  },
  {
    "id": 10,
    "slug": "bai-33-knight-rider-led",
    "title": "Bài 10: Dải 6 LED Onboard Tang Nano 9K chạy đuổi (Knight Rider)",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Lập trình thanh ghi dịch điều khiển 6 LED Onboard Tang Nano 9K sáng đuổi tuần hoàn từ LED0 đến LED5.",
    "analysis": "Sử dụng bộ đếm chia tần số clock 27MHz và thanh ghi dịch 6-bit `led_reg <= {led_reg[4:0], led_reg[5]}`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3;\nIO_LOC \"led[0]\" 10; IO_LOC \"led[1]\" 11; IO_LOC \"led[2]\" 13; IO_LOC \"led[3]\" 14; IO_LOC \"led[4]\" 15; IO_LOC \"led[5]\" 16;",
    "exampleCode": "// VÍ DỤ THAM KHẢO: Thanh ghi dịch vòng (Ring Register)\nmodule ring_shift (\n    input wire clk, rst_n,\n    output reg [3:0] q\n);\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) q <= 4'b0001;\n        else q <= {q[2:0], q[3]};\n    end\nendmodule",
    "template": "module knight_rider_led (\n    input wire clk,\n    input wire rst_n,\n    output reg [5:0] led\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Hướng dẫn: Khởi tạo led <= 6'b000001 khi rst_n=0, và dịch vòng {led[4:0], led[5]} tại mỗi nhịp clock\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n; wire [5:0] led;\n    knight_rider_led uut (.clk(clk), .rst_n(rst_n), .led(led));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; #12; rst_n=1; #150;\n        $finish;\n    end\nendmodule",
    "solution": "module knight_rider_led(input clk, rst_n, output reg [5:0] led); always @(posedge clk or negedge rst_n) if (!rst_n) led <= 6'b000001; else led <= {led[4:0], led[5]}; endmodule",
    "simInputs": [
      {
        "id": "rst_n",
        "label": "Reset (SW1)"
      }
    ],
    "simOutputs": [
      {
        "id": "l0",
        "label": "LED0"
      },
      {
        "id": "l1",
        "label": "LED1"
      },
      {
        "id": "l2",
        "label": "LED2"
      },
      {
        "id": "l3",
        "label": "LED3"
      }
    ],
    "simType": "shift",
    "evalFn": "if (!inputs.rst_n) return {l0:1,l1:0,l2:0,l3:0}; const idx = env.clkTick % 4; return {l0:idx===0?1:0, l1:idx===1?1:0, l2:idx===2?1:0, l3:idx===3?1:0};",
    "fillableTruthTable": [
      {
        "in": {
          "Trạng thái / Xung Clock": "Reset (rst_n=0)"
        },
        "out": {
          "Mẫu LED [5:0] (Điền 6-bit 0/1)": ""
        }
      },
      {
        "in": {
          "Trạng thái / Xung Clock": "Nhịp Clock 1"
        },
        "out": {
          "Mẫu LED [5:0] (Điền 6-bit 0/1)": ""
        }
      },
      {
        "in": {
          "Trạng thái / Xung Clock": "Nhịp Clock 2"
        },
        "out": {
          "Mẫu LED [5:0] (Điền 6-bit 0/1)": ""
        }
      },
      {
        "in": {
          "Trạng thái / Xung Clock": "Nhịp Clock 3"
        },
        "out": {
          "Mẫu LED [5:0] (Điền 6-bit 0/1)": ""
        }
      },
      {
        "in": {
          "Trạng thái / Xung Clock": "Nhịp Clock 4"
        },
        "out": {
          "Mẫu LED [5:0] (Điền 6-bit 0/1)": ""
        }
      },
      {
        "in": {
          "Trạng thái / Xung Clock": "Nhịp Clock 5"
        },
        "out": {
          "Mẫu LED [5:0] (Điền 6-bit 0/1)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_Mẫu LED [5:0] (Điền 6-bit 0/1)": "000001",
      "r1_Mẫu LED [5:0] (Điền 6-bit 0/1)": "000010",
      "r2_Mẫu LED [5:0] (Điền 6-bit 0/1)": "000100",
      "r3_Mẫu LED [5:0] (Điền 6-bit 0/1)": "001000",
      "r4_Mẫu LED [5:0] (Điền 6-bit 0/1)": "010000",
      "r5_Mẫu LED [5:0] (Điền 6-bit 0/1)": "100000"
    },
    "hasNotesBox": true
  },
  {
    "id": 11,
    "slug": "bai-08-kmap-3input",
    "title": "Bài 11: Hàm logic 3 đầu vào rút gọn bằng Karnaugh (K-map)",
    "category": "combinational_basic",
    "categoryName": "Phần B: Mạch Logic Cơ Bản",
    "difficulty": "Cơ bản",
    "desc": "Thực hiện rút gọn biểu thức logic 3 ngõ vào A, B, C bằng Bìa Karnaugh: \\(F(A,B,C) = \\sum(1, 3, 5, 7)\\) và lập trình Verilog.",
    "analysis": "Các minterm (1,3,5,7) tương ứng với A, B, C có C=1. Khi gom nhóm trên bìa Karnaugh, ta thu được biểu thức rút gọn cực kỳ tối giản: \\(F = C\\).",
    "cst": "IO_LOC \"a\" 3; IO_LOC \"b\" 4; IO_LOC \"c\" 5;\nIO_LOC \"f\" 10;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "c": "0",
        "f": "0"
      },
      {
        "a": "0",
        "b": "0",
        "c": "1",
        "f": "1"
      },
      {
        "a": "0",
        "b": "1",
        "c": "0",
        "f": "0"
      },
      {
        "a": "0",
        "b": "1",
        "c": "1",
        "f": "1"
      },
      {
        "a": "1",
        "b": "0",
        "c": "0",
        "f": "0"
      },
      {
        "a": "1",
        "b": "0",
        "c": "1",
        "f": "1"
      },
      {
        "a": "1",
        "b": "1",
        "c": "0",
        "f": "0"
      },
      {
        "a": "1",
        "b": "1",
        "c": "1",
        "f": "1"
      }
    ],
    "template": "module kmap_minimized (\n    input wire a,\n    input wire b,\n    input wire c,\n    output wire y\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Biểu thức rút gọn K-map: y = (a & b) | (~c & a)\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b, c; wire f;\n    kmap_3input uut (.a(a), .b(b), .c(c), .f(f));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; c=0; #10;\n        a=0; b=0; c=1; #10;\n        a=0; b=1; c=1; #10;\n        a=1; b=1; c=0; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module kmap_minimized (\n    input wire a,\n    input wire b,\n    input wire c,\n    output wire y\n);\n    assign y = (a & b) | (~c & a);\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "A"
      },
      {
        "id": "b",
        "label": "B"
      },
      {
        "id": "c",
        "label": "C"
      }
    ],
    "simOutputs": [
      {
        "id": "f",
        "label": "Hàm F"
      }
    ],
    "simType": "comb",
    "evalFn": "return { f: inputs.c ? 1 : 0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 11: BIỂU THỨC LOGIC K-MAP 3 ĐẦU VÀO\nmodule example_kmap (\n    input wire a, b, c,\n    output wire y\n);\n    assign y = (a & b) | (~c & a);\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0",
          "c": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "0",
          "c": "1"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1",
          "c": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1",
          "c": "1"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0",
          "c": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0",
          "c": "1"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1",
          "c": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1",
          "c": "1"
        },
        "out": {
          "y": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y": "0",
      "r1_y": "0",
      "r2_y": "0",
      "r3_y": "0",
      "r4_y": "1",
      "r5_y": "0",
      "r6_y": "1",
      "r7_y": "1"
    }
  },
  {
    "id": 12,
    "slug": "bai-09-mux21",
    "title": "Bài 12: Bộ chọn kênh MUX 2:1",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ chọn kênh MUX 2-sang-1 với tín hiệu chọn `sel`. Khi `sel=0` chọn ngõ vào `d0`, khi `sel=1` chọn ngõ vào `d1`.",
    "analysis": "Biểu thức MUX 2:1 là `y = (sel) ? d1 : d0` hoặc `y = (~sel & d0) | (sel & d1)`.",
    "cst": "IO_LOC \"d0\" 3; IO_LOC \"d1\" 4; IO_LOC \"sel\" 5;\nIO_LOC \"y\" 10;",
    "truthTable": [
      {
        "sel": "0",
        "d0": "0",
        "d1": "1",
        "y": "0 (chọn d0)"
      },
      {
        "sel": "0",
        "d0": "1",
        "d1": "0",
        "y": "1 (chọn d0)"
      },
      {
        "sel": "1",
        "d0": "0",
        "d1": "1",
        "y": "1 (chọn d1)"
      },
      {
        "sel": "1",
        "d0": "1",
        "d1": "0",
        "y": "0 (chọn d1)"
      }
    ],
    "template": "module mux_2to1 (\n    input wire d0,\n    input wire d1,\n    input wire sel,\n    output wire y\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // Dùng toán tử điều kiện sel ? d1 : d0\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg d0, d1, sel; wire y;\n    mux21 uut (.d0(d0), .d1(d1), .sel(sel), .y(y));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        d0=1; d1=0; sel=0; #10;\n        sel=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module mux_2to1 (\n    input wire d0,\n    input wire d1,\n    input wire sel,\n    output wire y\n);\n    assign y = sel ? d1 : d0;\nendmodule",
    "simInputs": [
      {
        "id": "d0",
        "label": "Data D0"
      },
      {
        "id": "d1",
        "label": "Data D1"
      },
      {
        "id": "sel",
        "label": "Select SEL"
      }
    ],
    "simOutputs": [
      {
        "id": "y",
        "label": "Mux Out Y"
      }
    ],
    "simType": "comb",
    "evalFn": "return { y: inputs.sel ? (inputs.d1?1:0) : (inputs.d0?1:0) };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 12: TOÁN TỬ ĐIỀU KIỆN MUX (?)\nmodule example_mux2to1 (\n    input wire d0, d1, sel,\n    output wire y\n);\n    assign y = sel ? d1 : d0;\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "sel": "0",
          "d0": "0",
          "d1": "1"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "sel": "0",
          "d0": "1",
          "d1": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "sel": "1",
          "d0": "1",
          "d1": "0"
        },
        "out": {
          "y": ""
        }
      },
      {
        "in": {
          "sel": "1",
          "d0": "0",
          "d1": "1"
        },
        "out": {
          "y": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y": "0",
      "r1_y": "1",
      "r2_y": "0",
      "r3_y": "1"
    }
  },
  {
    "id": 13,
    "slug": "bai-10-mux41",
    "title": "Bài 13: Bộ chọn kênh MUX 4:1",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ chọn kênh MUX 4-sang-1 nhận 4 đường dữ liệu `d[3:0]` và 2 bit chọn `sel[1:0]` dùng khối `always @(*)` và `case`.",
    "analysis": "Sử dụng câu lệnh `case(sel)` trong khối `always @(*)` tổ hợp để chọn kênh 00->d[0], 01->d[1], 10->d[2], 11->d[3].",
    "cst": "IO_LOC \"sel[0]\" 3; IO_LOC \"sel[1]\" 4;\nIO_LOC \"y\" 10;",
    "truthTable": [
      {
        "sel": "2'b00",
        "y": "d[0]"
      },
      {
        "sel": "2'b01",
        "y": "d[1]"
      },
      {
        "sel": "2'b10",
        "y": "d[2]"
      },
      {
        "sel": "2'b11",
        "y": "d[3]"
      }
    ],
    "template": "module mux_4to1 (\n    input wire in0, in1, in2, in3,\n    input wire sel0, sel1,\n    output wire y\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [3:0] d; reg [1:0] sel; wire y;\n    mux41 uut (.d(d), .sel(sel), .y(y));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        d = 4'b1010; sel = 2'b00; #10;\n        sel = 2'b01; #10;\n        sel = 2'b10; #10;\n        sel = 2'b11; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module mux_4to1 (\n    input wire in0, in1, in2, in3,\n    input wire sel0, sel1,\n    output wire y\n);\n    assign y = (sel1 == 0 && sel0 == 0) ? in0 :\n               (sel1 == 0 && sel0 == 1) ? in1 :\n               (sel1 == 1 && sel0 == 0) ? in2 : in3;\nendmodule",
    "simInputs": [
      {
        "id": "d0",
        "label": "d[0]"
      },
      {
        "id": "d1",
        "label": "d[1]"
      },
      {
        "id": "sel0",
        "label": "sel[0]"
      },
      {
        "id": "sel1",
        "label": "sel[1]"
      }
    ],
    "simOutputs": [
      {
        "id": "y",
        "label": "MUX41 Out Y"
      }
    ],
    "simType": "comb",
    "evalFn": "const s = (inputs.sel1?2:0) + (inputs.sel0?1:0); const arr = [inputs.d0?1:0, inputs.d1?1:0, 1, 0]; return { y: arr[s] };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 13: KHỐI CASE HOẶC TOÁN TỬ LỒNG\nmodule example_mux4to1 (\n    input wire in0, in1, in2, in3,\n    input wire [1:0] sel,\n    output reg y\n);\n    always @(*) begin\n        case (sel)\n            2'b00: y = in0;\n            2'b01: y = in1;\n            2'b10: y = in2;\n            2'b11: y = in3;\n        endcase\n    end\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "sel1": "0",
          "sel0": "0"
        },
        "out": {
          "Kênh ngõ ra y (Điền in0/in1/in2/in3)": ""
        }
      },
      {
        "in": {
          "sel1": "0",
          "sel0": "1"
        },
        "out": {
          "Kênh ngõ ra y (Điền in0/in1/in2/in3)": ""
        }
      },
      {
        "in": {
          "sel1": "1",
          "sel0": "0"
        },
        "out": {
          "Kênh ngõ ra y (Điền in0/in1/in2/in3)": ""
        }
      },
      {
        "in": {
          "sel1": "1",
          "sel0": "1"
        },
        "out": {
          "Kênh ngõ ra y (Điền in0/in1/in2/in3)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_Kênh ngõ ra y (Điền in0/in1/in2/in3)": "in0",
      "r1_Kênh ngõ ra y (Điền in0/in1/in2/in3)": "in1",
      "r2_Kênh ngõ ra y (Điền in0/in1/in2/in3)": "in2",
      "r3_Kênh ngõ ra y (Điền in0/in1/in2/in3)": "in3"
    }
  },
  {
    "id": 14,
    "slug": "bai-11-decoder24",
    "title": "Bài 14: Bộ giải mã Decoder 2-to-4",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ giải mã 2-sang-4 có tín hiệu cho phép `en` (Enable). Khi `en=1`, chuyển đổi 2-bit ngõ vào `in[1:0]` thành 4-bit ngõ ra `out[3:0]` tích cực cao.",
    "analysis": "Decoder 2:4 tạo tín hiệu One-Hot tại ngõ ra tương ứng với giá trị nhị phân ngõ vào.",
    "cst": "IO_LOC \"in[0]\" 3; IO_LOC \"in[1]\" 4; IO_LOC \"en\" 5;\nIO_LOC \"out[0]\" 10; IO_LOC \"out[1]\" 11; IO_LOC \"out[2]\" 13; IO_LOC \"out[3]\" 14;",
    "truthTable": [
      {
        "en": "0",
        "in": "XX",
        "out": "4'b0000"
      },
      {
        "en": "1",
        "in": "2'b00",
        "out": "4'b0001"
      },
      {
        "en": "1",
        "in": "2'b01",
        "out": "4'b0010"
      },
      {
        "en": "1",
        "in": "2'b10",
        "out": "4'b0100"
      },
      {
        "en": "1",
        "in": "2'b11",
        "out": "4'b1000"
      }
    ],
    "template": "module decoder_2to4 (\n    input wire a0, a1,\n    output wire y0, y1, y2, y3\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [1:0] in; reg en; wire [3:0] out;\n    decoder24 uut (.in(in), .en(en), .out(out));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        en=0; in=2'b00; #10;\n        en=1; in=2'b00; #10;\n        in=2'b01; #10;\n        in=2'b10; #10;\n        in=2'b11; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module decoder_2to4 (\n    input wire a0, a1,\n    output wire y0, y1, y2, y3\n);\n    assign y0 = ~a1 & ~a0;\n    assign y1 = ~a1 &  a0;\n    assign y2 =  a1 & ~a0;\n    assign y3 =  a1 &  a0;\nendmodule",
    "simInputs": [
      {
        "id": "in0",
        "label": "in[0]"
      },
      {
        "id": "in1",
        "label": "in[1]"
      },
      {
        "id": "en",
        "label": "Enable"
      }
    ],
    "simOutputs": [
      {
        "id": "o0",
        "label": "out[0]"
      },
      {
        "id": "o1",
        "label": "out[1]"
      },
      {
        "id": "o2",
        "label": "out[2]"
      },
      {
        "id": "o3",
        "label": "out[3]"
      }
    ],
    "simType": "comb",
    "evalFn": "if (!inputs.en) return {o0:0,o1:0,o2:0,o3:0}; const idx = (inputs.in1?2:0)+(inputs.in0?1:0); return {o0:idx===0?1:0, o1:idx===1?1:0, o2:idx===2?1:0, o3:idx===3?1:0};",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 14: BỘ GIẢI MÃ 2 SANG 4\nmodule example_dec (\n    input wire a1, a0,\n    output wire y0, y1, y2, y3\n);\n    assign y0 = ~a1 & ~a0;\n    assign y1 = ~a1 &  a0;\n    assign y2 =  a1 & ~a0;\n    assign y3 =  a1 &  a0;\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a1": "0",
          "a0": "0"
        },
        "out": {
          "y0": "",
          "y1": "",
          "y2": "",
          "y3": ""
        }
      },
      {
        "in": {
          "a1": "0",
          "a0": "1"
        },
        "out": {
          "y0": "",
          "y1": "",
          "y2": "",
          "y3": ""
        }
      },
      {
        "in": {
          "a1": "1",
          "a0": "0"
        },
        "out": {
          "y0": "",
          "y1": "",
          "y2": "",
          "y3": ""
        }
      },
      {
        "in": {
          "a1": "1",
          "a0": "1"
        },
        "out": {
          "y0": "",
          "y1": "",
          "y2": "",
          "y3": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y0": "1",
      "r0_y1": "0",
      "r0_y2": "0",
      "r0_y3": "0",
      "r1_y0": "0",
      "r1_y1": "1",
      "r1_y2": "0",
      "r1_y3": "0",
      "r2_y0": "0",
      "r2_y1": "0",
      "r2_y2": "1",
      "r2_y3": "0",
      "r3_y0": "0",
      "r3_y1": "0",
      "r3_y2": "0",
      "r3_y3": "1"
    }
  },
  {
    "id": 15,
    "slug": "bai-12-decoder38",
    "title": "Bài 15: Bộ giải mã Decoder 3-to-8",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ giải mã 3-sang-8 tương đương vi mạch 74HC138. Chuyển đổi 3-bit ngõ vào địa chỉ `in[2:0]` thành 8 ngõ ra giải mã.",
    "analysis": "Dùng phép dịch bit `out = (1'b1 << in)` hoặc khối `case(in)` 8 nhánh 3'b000 -> 8'b00000001 đến 3'b111 -> 8'b10000000.",
    "cst": "IO_LOC \"in[0]\" 3; IO_LOC \"in[1]\" 4; IO_LOC \"in[2]\" 5;",
    "truthTable": [
      {
        "in": "3'b000",
        "out": "8'b00000001"
      },
      {
        "in": "3'b100",
        "out": "8'b00010000"
      },
      {
        "in": "3'b111",
        "out": "8'b10000000"
      }
    ],
    "template": "module decoder_3to8 (\n    input wire a0, a1, a2,\n    output wire [7:0] y\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [2:0] in; wire [7:0] out;\n    decoder38 uut (.in(in), .out(out));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        in=3'b000; #10; in=3'b011; #10; in=3'b111; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module decoder_3to8 (\n    input wire a0, a1, a2,\n    output wire [7:0] y\n);\n    assign y[0] = ~a2 & ~a1 & ~a0;\n    assign y[1] = ~a2 & ~a1 &  a0;\n    assign y[2] = ~a2 &  a1 & ~a0;\n    assign y[3] = ~a2 &  a1 &  a0;\n    assign y[4] =  a2 & ~a1 & ~a0;\n    assign y[5] =  a2 & ~a1 &  a0;\n    assign y[6] =  a2 &  a1 & ~a0;\n    assign y[7] =  a2 &  a1 &  a0;\nendmodule",
    "simInputs": [
      {
        "id": "in0",
        "label": "in[0]"
      },
      {
        "id": "in1",
        "label": "in[1]"
      },
      {
        "id": "in2",
        "label": "in[2]"
      }
    ],
    "simOutputs": [
      {
        "id": "o0",
        "label": "out[0]"
      },
      {
        "id": "o1",
        "label": "out[1]"
      },
      {
        "id": "o2",
        "label": "out[2]"
      },
      {
        "id": "o3",
        "label": "out[3]"
      }
    ],
    "simType": "comb",
    "evalFn": "const v = (inputs.in2?4:0)+(inputs.in1?2:0)+(inputs.in0?1:0); return {o0:v===0?1:0, o1:v===1?1:0, o2:v===2?1:0, o3:v===3?1:0};",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 15: DỊCH BIT TẠO DECODER 3 SANG 8\nmodule example_dec3to8 (\n    input wire [2:0] in_code,\n    output wire [7:0] out_y\n);\n    assign out_y = 1'b1 << in_code; // Dịch trái 1 bit theo giá trị ngõ vào\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a2": "0",
          "a1": "0",
          "a0": "0"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "0",
          "a1": "0",
          "a0": "1"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "0",
          "a1": "1",
          "a0": "0"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "0",
          "a1": "1",
          "a0": "1"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "1",
          "a1": "0",
          "a0": "0"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "1",
          "a1": "0",
          "a0": "1"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "1",
          "a1": "1",
          "a0": "0"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      },
      {
        "in": {
          "a2": "1",
          "a1": "1",
          "a0": "1"
        },
        "out": {
          "Ngõ ra y [7:0] (Điền 8-bit nhị phân)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "00000001",
      "r1_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "00000010",
      "r2_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "00000100",
      "r3_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "00001000",
      "r4_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "00010000",
      "r5_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "00100000",
      "r6_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "01000000",
      "r7_Ngõ ra y [7:0] (Điền 8-bit nhị phân)": "10000000"
    }
  },
  {
    "id": 16,
    "slug": "bai-13-encoder42",
    "title": "Bài 16: Bộ mã hóa ưu tiên Encoder 4-to-2",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ mã hóa ưu tiên 4-sang-2 nhận 4 đầu vào `in[3:0]`. Bit có trọng số cao nhất (in[3]) có độ ưu tiên cao nhất.",
    "analysis": "Bộ mã hóa ưu tiên giải quyết xung đột khi nhiều ngõ vào đồng thời bằng 1 bằng cách chọn ngõ vào có chỉ số cao nhất.",
    "cst": "IO_LOC \"in[0]\" 3; IO_LOC \"in[1]\" 4; IO_LOC \"in[2]\" 5; IO_LOC \"in[3]\" 6;\nIO_LOC \"code[0]\" 10; IO_LOC \"code[1]\" 11; IO_LOC \"valid\" 13;",
    "truthTable": [
      {
        "in": "4'b0000",
        "valid": "0",
        "code": "2'b00"
      },
      {
        "in": "4'bxxx1",
        "valid": "1",
        "code": "2'b00 (in[0]=1)"
      },
      {
        "in": "4'bxx10",
        "valid": "1",
        "code": "2'b01 (in[1]=1)"
      },
      {
        "in": "4'bx100",
        "valid": "1",
        "code": "2'b10 (in[2]=1)"
      },
      {
        "in": "4'b1000",
        "valid": "1",
        "code": "2'b11 (in[3]=1)"
      }
    ],
    "template": "module encoder42 (\n    input wire [3:0] in,\n    output reg [1:0] code,\n    output reg       valid\n);\n\n    always @(*) begin\n        valid = 1'b1;\n        if (in[3])      code = 2'b11;\n        else if (in[2]) code = 2'b10;\n        else if (in[1]) code = 2'b01;\n        else if (in[0]) code = 2'b00;\n        else begin\n            code  = 2'b00;\n            valid = 1'b0;\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [3:0] in; wire [1:0] code; wire valid;\n    encoder42 uut (.in(in), .code(code), .valid(valid));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        in=4'b0000; #10;\n        in=4'b0001; #10;\n        in=4'b0110; #10;\n        in=4'b1000; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module encoder42 (\n    input wire [3:0] in,\n    output reg [1:0] code,\n    output reg valid\n);\n    always @(*) begin\n        valid = 1'b1;\n        if (in[3]) code = 2'b11;\n        else if (in[2]) code = 2'b10;\n        else if (in[1]) code = 2'b01;\n        else if (in[0]) code = 2'b00;\n        else begin code = 2'b00; valid = 1'b0; end\n    end\nendmodule",
    "simInputs": [
      {
        "id": "in0",
        "label": "in[0]"
      },
      {
        "id": "in1",
        "label": "in[1]"
      },
      {
        "id": "in2",
        "label": "in[2]"
      },
      {
        "id": "in3",
        "label": "in[3]"
      }
    ],
    "simOutputs": [
      {
        "id": "c0",
        "label": "code[0]"
      },
      {
        "id": "c1",
        "label": "code[1]"
      },
      {
        "id": "valid",
        "label": "Valid"
      }
    ],
    "simType": "comb",
    "evalFn": "let c=0, v=1; if (inputs.in3) c=3; else if (inputs.in2) c=2; else if (inputs.in1) c=1; else if (inputs.in0) c=0; else {c=0; v=0;} return {c0:c&1?1:0, c1:c&2?1:0, valid:v};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "i3": "1",
          "i2": "X",
          "i1": "X",
          "i0": "X"
        },
        "out": {
          "y1": "",
          "y0": "",
          "v (Valid)": ""
        }
      },
      {
        "in": {
          "i3": "0",
          "i2": "1",
          "i1": "X",
          "i0": "X"
        },
        "out": {
          "y1": "",
          "y0": "",
          "v (Valid)": ""
        }
      },
      {
        "in": {
          "i3": "0",
          "i2": "0",
          "i1": "1",
          "i0": "X"
        },
        "out": {
          "y1": "",
          "y0": "",
          "v (Valid)": ""
        }
      },
      {
        "in": {
          "i3": "0",
          "i2": "0",
          "i1": "0",
          "i0": "1"
        },
        "out": {
          "y1": "",
          "y0": "",
          "v (Valid)": ""
        }
      },
      {
        "in": {
          "i3": "0",
          "i2": "0",
          "i1": "0",
          "i0": "0"
        },
        "out": {
          "y1": "",
          "y0": "",
          "v (Valid)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_y1": "1",
      "r0_y0": "1",
      "r0_v (Valid)": "1",
      "r1_y1": "1",
      "r1_y0": "0",
      "r1_v (Valid)": "1",
      "r2_y1": "0",
      "r2_y0": "1",
      "r2_v (Valid)": "1",
      "r3_y1": "0",
      "r3_y0": "0",
      "r3_v (Valid)": "1",
      "r4_y1": "0",
      "r4_y0": "0",
      "r4_v (Valid)": "0"
    }
  },
  {
    "id": 17,
    "slug": "bai-14-comparator",
    "title": "Bài 17: Bộ so sánh 2-bit (Magnitude Comparator)",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ so sánh số nguyên không dấu 2-bit giữa A[1:0] và B[1:0], tạo 3 tín hiệu báo: A > B, A == B, A < B.",
    "analysis": "So sánh lần lượt bit MSB rồi đến bit LSB. Verilog hỗ trợ toán tử so sánh trực tiếp: `>`, `==`, `<`.",
    "cst": "IO_LOC \"a[0]\" 3; IO_LOC \"a[1]\" 4; IO_LOC \"b[0]\" 5; IO_LOC \"b[1]\" 6;\nIO_LOC \"gt\" 10; IO_LOC \"eq\" 11; IO_LOC \"lt\" 13;",
    "truthTable": [
      {
        "a": "2'b10",
        "b": "2'b01",
        "gt": "1",
        "eq": "0",
        "lt": "0"
      },
      {
        "a": "2'b11",
        "b": "2'b11",
        "gt": "0",
        "eq": "1",
        "lt": "0"
      },
      {
        "a": "2'b00",
        "b": "2'b10",
        "gt": "0",
        "eq": "0",
        "lt": "1"
      }
    ],
    "template": "module comparator_2bit (\n    input wire [1:0] a,\n    input wire [1:0] b,\n    output wire gt, // A > B\n    output wire eq, // A == B\n    output wire lt  // A < B\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [1:0] a, b; wire gt, eq, lt;\n    comparator_2bit uut (.a(a), .b(b), .gt(gt), .eq(eq), .lt(lt));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=2'b10; b=2'b01; #10;\n        a=2'b11; b=2'b11; #10;\n        a=2'b01; b=2'b10; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module comparator_2bit(input [1:0] a, b, output gt, eq, lt); assign gt = (a > b); assign eq = (a == b); assign lt = (a < b); endmodule",
    "simInputs": [
      {
        "id": "a0",
        "label": "A[0]"
      },
      {
        "id": "a1",
        "label": "A[1]"
      },
      {
        "id": "b0",
        "label": "B[0]"
      },
      {
        "id": "b1",
        "label": "B[1]"
      }
    ],
    "simOutputs": [
      {
        "id": "gt",
        "label": "A > B"
      },
      {
        "id": "eq",
        "label": "A == B"
      },
      {
        "id": "lt",
        "label": "A < B"
      }
    ],
    "simType": "comb",
    "evalFn": "const A = (inputs.a1?2:0)+(inputs.a0?1:0); const B = (inputs.b1?2:0)+(inputs.b0?1:0); return { gt: A>B?1:0, eq: A===B?1:0, lt: A<B?1:0 };",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "A[1:0]": "2'b10 (2)",
          "B[1:0]": "2'b01 (1)"
        },
        "out": {
          "gt (A>B)": "",
          "eq (A=B)": "",
          "lt (A<B)": ""
        }
      },
      {
        "in": {
          "A[1:0]": "2'b01 (1)",
          "B[1:0]": "2'b10 (2)"
        },
        "out": {
          "gt (A>B)": "",
          "eq (A=B)": "",
          "lt (A<B)": ""
        }
      },
      {
        "in": {
          "A[1:0]": "2'b11 (3)",
          "B[1:0]": "2'b11 (3)"
        },
        "out": {
          "gt (A>B)": "",
          "eq (A=B)": "",
          "lt (A<B)": ""
        }
      },
      {
        "in": {
          "A[1:0]": "2'b00 (0)",
          "B[1:0]": "2'b01 (1)"
        },
        "out": {
          "gt (A>B)": "",
          "eq (A=B)": "",
          "lt (A<B)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_gt (A>B)": "1",
      "r0_eq (A=B)": "0",
      "r0_lt (A<B)": "0",
      "r1_gt (A>B)": "0",
      "r1_eq (A=B)": "0",
      "r1_lt (A<B)": "1",
      "r2_gt (A>B)": "0",
      "r2_eq (A=B)": "1",
      "r2_lt (A<B)": "0",
      "r3_gt (A>B)": "0",
      "r3_eq (A=B)": "0",
      "r3_lt (A<B)": "1"
    }
  },
  {
    "id": 18,
    "slug": "bai-15-parity",
    "title": "Bài 18: Mạch kiểm tra Bit Chẵn Lẻ (Parity Generator)",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế mạch phát hiện bit chẵn lẻ 4-bit `data[3:0]`. Tính bit Parity chẵn (`even_parity`) và Parity lẻ (`odd_parity`).",
    "analysis": "Bit Even Parity là XOR của tất cả các bit: `even_parity = ^data`. Bit Odd Parity là XNOR: `odd_parity = ~^data`.",
    "cst": "IO_LOC \"data[0]\" 3; IO_LOC \"data[1]\" 4; IO_LOC \"data[2]\" 5; IO_LOC \"data[3]\" 6;\nIO_LOC \"even_parity\" 10; IO_LOC \"odd_parity\" 11;",
    "truthTable": [
      {
        "data": "4'b0000 (0 bit 1)",
        "even_parity": "0",
        "odd_parity": "1"
      },
      {
        "data": "4'b0001 (1 bit 1)",
        "even_parity": "1",
        "odd_parity": "0"
      },
      {
        "data": "4'b0011 (2 bit 1)",
        "even_parity": "0",
        "odd_parity": "1"
      }
    ],
    "template": "module parity_gen (\n    input wire [3:0] data,\n    output wire even_parity,\n    output wire odd_parity\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [3:0] data; wire ep, op;\n    parity_gen uut (.data(data), .even_parity(ep), .odd_parity(op));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        data=4'b0000; #10;\n        data=4'b0001; #10;\n        data=4'b0011; #10;\n        data=4'b0111; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module parity_gen(input [3:0] data, output even_parity, odd_parity); assign even_parity = ^data; assign odd_parity = ~^data; endmodule",
    "simInputs": [
      {
        "id": "d0",
        "label": "D0"
      },
      {
        "id": "d1",
        "label": "D1"
      },
      {
        "id": "d2",
        "label": "D2"
      },
      {
        "id": "d3",
        "label": "D3"
      }
    ],
    "simOutputs": [
      {
        "id": "ep",
        "label": "Even Parity"
      },
      {
        "id": "op",
        "label": "Odd Parity"
      }
    ],
    "simType": "comb",
    "evalFn": "const count = (inputs.d0?1:0)+(inputs.d1?1:0)+(inputs.d2?1:0)+(inputs.d3?1:0); const ep = count % 2 !== 0 ? 1 : 0; return { ep: ep, op: ep?0:1 };",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "d3": "0",
          "d2": "0",
          "d1": "0",
          "d0": "0"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "0",
          "d2": "0",
          "d1": "0",
          "d0": "1"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "0",
          "d2": "0",
          "d1": "1",
          "d0": "1"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "0",
          "d2": "1",
          "d1": "1",
          "d0": "1"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "1",
          "d2": "1",
          "d1": "1",
          "d0": "1"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "1",
          "d2": "0",
          "d1": "0",
          "d0": "0"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "1",
          "d2": "0",
          "d1": "0",
          "d0": "1"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      },
      {
        "in": {
          "d3": "1",
          "d2": "0",
          "d1": "1",
          "d0": "0"
        },
        "out": {
          "even_parity": "",
          "odd_parity": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_even_parity": "0",
      "r0_odd_parity": "1",
      "r1_even_parity": "1",
      "r1_odd_parity": "0",
      "r2_even_parity": "0",
      "r2_odd_parity": "1",
      "r3_even_parity": "1",
      "r3_odd_parity": "0",
      "r4_even_parity": "0",
      "r4_odd_parity": "1",
      "r5_even_parity": "1",
      "r5_odd_parity": "0",
      "r6_even_parity": "0",
      "r6_odd_parity": "1",
      "r7_even_parity": "0",
      "r7_odd_parity": "1"
    }
  },
  {
    "id": 19,
    "slug": "bai-16-half-adder",
    "title": "Bài 19: Bộ cộng nửa bit (Half Adder)",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ cộng nửa bit (Half Adder) cộng 2 bit đơn A và B, tạo bit Tổng `sum` và bit Nhớ `carry`.",
    "analysis": "`sum = a ^ b`, `carry = a & b`.",
    "cst": "IO_LOC \"a\" 3; IO_LOC \"b\" 4;\nIO_LOC \"sum\" 10; IO_LOC \"carry\" 11;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "sum": "0",
        "carry": "0"
      },
      {
        "a": "0",
        "b": "1",
        "sum": "1",
        "carry": "0"
      },
      {
        "a": "1",
        "b": "0",
        "sum": "1",
        "carry": "0"
      },
      {
        "a": "1",
        "b": "1",
        "sum": "0",
        "carry": "1"
      }
    ],
    "template": "module half_adder (\n    input wire a,\n    input wire b,\n    output wire sum,\n    output wire cout\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    // sum = a ^ b, cout = a & b\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b; wire sum, carry;\n    half_adder uut (.a(a), .b(b), .sum(sum), .carry(carry));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; #10; a=0; b=1; #10;\n        a=1; b=0; #10; a=1; b=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module half_adder (\n    input wire a,\n    input wire b,\n    output wire sum,\n    output wire cout\n);\n    assign sum = a ^ b;\n    assign cout = a & b;\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "Số hạng A"
      },
      {
        "id": "b",
        "label": "Số hạng B"
      }
    ],
    "simOutputs": [
      {
        "id": "sum",
        "label": "Tổng Sum"
      },
      {
        "id": "carry",
        "label": "Bit nhớ Carry"
      }
    ],
    "simType": "comb",
    "evalFn": "const A = inputs.a?1:0; const B = inputs.b?1:0; return { sum: A^B, carry: (A&B)?1:0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 19: BỘ CỘNG NỬA BIT (HALF ADDER)\nmodule example_ha (\n    input wire a, b,\n    output wire s, c\n);\n    assign s = a ^ b;\n    assign c = a & b;\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_sum": "0",
      "r0_cout": "0",
      "r1_sum": "1",
      "r1_cout": "0",
      "r2_sum": "1",
      "r2_cout": "0",
      "r3_sum": "0",
      "r3_cout": "1"
    }
  },
  {
    "id": 20,
    "slug": "bai-17-full-adder",
    "title": "Bài 20: Bộ cộng đầy đủ (Full Adder)",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ cộng 1-bit đầy đủ (Full Adder) nhận 2 bit số hạng A, B và bit nhớ đầu vào `cin`, tính bit Tổng `sum` và bit nhớ đầu ra `cout`.",
    "analysis": "`sum = a ^ b ^ cin`, `cout = (a & b) | (cin & (a ^ b))`.",
    "cst": "IO_LOC \"a\" 3; IO_LOC \"b\" 4; IO_LOC \"cin\" 5;\nIO_LOC \"sum\" 10; IO_LOC \"cout\" 11;",
    "truthTable": [
      {
        "a": "0",
        "b": "0",
        "cin": "0",
        "sum": "0",
        "cout": "0"
      },
      {
        "a": "1",
        "b": "1",
        "cin": "0",
        "sum": "0",
        "cout": "1"
      },
      {
        "a": "1",
        "b": "1",
        "cin": "1",
        "sum": "1",
        "cout": "1"
      }
    ],
    "template": "module full_adder (\n    input wire a,\n    input wire b,\n    input wire cin,\n    output wire sum,\n    output wire cout\n);\n\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg a, b, cin; wire sum, cout;\n    full_adder uut (.a(a), .b(b), .cin(cin), .sum(sum), .cout(cout));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=0; b=0; cin=0; #10;\n        a=1; b=1; cin=0; #10;\n        a=1; b=1; cin=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module full_adder (\n    input wire a,\n    input wire b,\n    input wire cin,\n    output wire sum,\n    output wire cout\n);\n    assign sum = a ^ b ^ cin;\n    assign cout = (a & b) | (cin & (a ^ b));\nendmodule",
    "simInputs": [
      {
        "id": "a",
        "label": "A"
      },
      {
        "id": "b",
        "label": "B"
      },
      {
        "id": "cin",
        "label": "Cin"
      }
    ],
    "simOutputs": [
      {
        "id": "sum",
        "label": "Sum"
      },
      {
        "id": "cout",
        "label": "Cout"
      }
    ],
    "simType": "comb",
    "evalFn": "const res = (inputs.a?1:0)+(inputs.b?1:0)+(inputs.cin?1:0); return { sum: res%2, cout: res>=2?1:0 };",
    "exampleCode": "// VÍ DỤ CÚ PHÁP BÀI 20: BỘ CỘNG ĐẦY ĐỦ 3 ĐẦU VÀO\nmodule example_fa (\n    input wire a, b, cin,\n    output wire sum, cout\n);\n    assign sum  = a ^ b ^ cin;\n    assign cout = (a & b) | (cin & (a ^ b));\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "a": "0",
          "b": "0",
          "cin": "0"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "0",
          "cin": "1"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1",
          "cin": "0"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "0",
          "b": "1",
          "cin": "1"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0",
          "cin": "0"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "0",
          "cin": "1"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1",
          "cin": "0"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      },
      {
        "in": {
          "a": "1",
          "b": "1",
          "cin": "1"
        },
        "out": {
          "sum": "",
          "cout": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_sum": "0",
      "r0_cout": "0",
      "r1_sum": "1",
      "r1_cout": "0",
      "r2_sum": "1",
      "r2_cout": "0",
      "r3_sum": "0",
      "r3_cout": "1",
      "r4_sum": "1",
      "r4_cout": "0",
      "r5_sum": "0",
      "r5_cout": "1",
      "r6_sum": "0",
      "r6_cout": "1",
      "r7_sum": "1",
      "r7_cout": "1"
    }
  },
  {
    "id": 21,
    "slug": "bai-18-adder-sub-4bit",
    "title": "Bài 21: Bộ cộng/trừ số nguyên 4-bit (4-bit Adder/Subtractor)",
    "category": "combinational_advanced",
    "categoryName": "Phần C: Mạch Tổ Hợp & Số Học",
    "difficulty": "Trung bình",
    "desc": "Thiết kế mạch cộng/trừ 4-bit giữa `a[3:0]` và `b[3:0]` với tín hiệu điều khiển `mode` (0: Cộng, 1: Trừ bù 2).",
    "analysis": "Dùng bù 2: Khi `mode=1`, đảo bit B `b_xor = b ^ {4{mode}}` và cộng thêm `mode` vào `cin`.",
    "cst": "IO_LOC \"mode\" 3;\nIO_LOC \"result[0]\" 10; IO_LOC \"result[1]\" 11; IO_LOC \"result[2]\" 13; IO_LOC \"result[3]\" 14;",
    "truthTable": [
      {
        "mode": "0 (Cộng)",
        "a": "4'b0101 (5)",
        "b": "4'b0011 (3)",
        "result": "4'b1000 (8)"
      },
      {
        "mode": "1 (Trừ)",
        "a": "4'b0101 (5)",
        "b": "4'b0011 (3)",
        "result": "4'b0010 (2)"
      }
    ],
    "template": "module adder_sub_4bit (\n    input wire [3:0] a,\n    input wire [3:0] b,\n    input wire       mode, // 0: Add, 1: Sub\n    output wire [3:0] result,\n    output wire       cout\n);\n\n    wire [3:0] b_mod = b ^ {4{mode}};\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg [3:0] a, b; reg mode; wire [3:0] res; wire cout;\n    adder_sub_4bit uut (.a(a), .b(b), .mode(mode), .result(res), .cout(cout));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        a=4'd5; b=4'd3; mode=0; #10;\n        mode=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module adder_sub_4bit(input [3:0] a, b, input mode, output [3:0] result, output cout); wire [3:0] b_mod = b ^ {4{mode}}; assign {cout, result} = a + b_mod + mode; endmodule",
    "simInputs": [
      {
        "id": "a0",
        "label": "A bit 0"
      },
      {
        "id": "a2",
        "label": "A bit 2"
      },
      {
        "id": "b0",
        "label": "B bit 0"
      },
      {
        "id": "mode",
        "label": "Mode (0:Add, 1:Sub)"
      }
    ],
    "simOutputs": [
      {
        "id": "r0",
        "label": "Res[0]"
      },
      {
        "id": "r1",
        "label": "Res[1]"
      },
      {
        "id": "r2",
        "label": "Res[2]"
      },
      {
        "id": "r3",
        "label": "Res[3]"
      }
    ],
    "simType": "comb",
    "evalFn": "const A = (inputs.a2?4:0)+(inputs.a0?1:0); const B = (inputs.b0?1:0); const res = inputs.mode ? (A - B) : (A + B); const val = (res + 16) % 16; return { r0: val&1?1:0, r1: val&2?1:0, r2: val&4?1:0, r3: val&8?1:0 };",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "A[3:0]": "0101 (5)",
          "B[3:0]": "0011 (3)",
          "sub": "0 (Cộng)"
        },
        "out": {
          "sum[3:0] (4-bit)": "",
          "cout": ""
        }
      },
      {
        "in": {
          "A[3:0]": "0101 (5)",
          "B[3:0]": "0011 (3)",
          "sub": "1 (Trừ)"
        },
        "out": {
          "sum[3:0] (4-bit)": "",
          "cout": ""
        }
      },
      {
        "in": {
          "A[3:0]": "1111 (15)",
          "B[3:0]": "0001 (1)",
          "sub": "0 (Cộng)"
        },
        "out": {
          "sum[3:0] (4-bit)": "",
          "cout": ""
        }
      },
      {
        "in": {
          "A[3:0]": "0000 (0)",
          "B[3:0]": "0001 (1)",
          "sub": "1 (Trừ)"
        },
        "out": {
          "sum[3:0] (4-bit)": "",
          "cout": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_sum[3:0] (4-bit)": "1000",
      "r0_cout": "0",
      "r1_sum[3:0] (4-bit)": "0010",
      "r1_cout": "1",
      "r2_sum[3:0] (4-bit)": "0000",
      "r2_cout": "1",
      "r3_sum[3:0] (4-bit)": "1111",
      "r3_cout": "0"
    }
  },
  {
    "id": 22,
    "slug": "bai-19-d-latch",
    "title": "Bài 22: Chốt D (D-Latch) & Phân biệt Latch vs Flip-Flop",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế mạch Chốt D (D-Latch) đáp ứng mức tín hiệu cho phép `enable` (Level-sensitive), và so sánh với Flip-Flop kích sườn.",
    "analysis": "Khi `enable=1`, ngõ ra `q` theo ngõ vào `d`. Khi `enable=0`, `q` giữ nguyên trạng thái cũ.",
    "cst": "IO_LOC \"d\" 3; IO_LOC \"enable\" 4;\nIO_LOC \"q\" 10;",
    "truthTable": [
      {
        "enable": "1 (Mở chốt)",
        "d": "1",
        "q": "1 (Theo D)"
      },
      {
        "enable": "0 (Khóa chốt)",
        "d": "X",
        "q": "Q_prev (Giữ giá trị cũ)"
      }
    ],
    "template": "module d_latch (\n    input wire d,\n    input wire enable,\n    output reg q\n);\n\n    always @(*) begin\n        if (enable) begin\n            q = d;\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg d, enable; wire q;\n    d_latch uut (.d(d), .enable(enable), .q(q));\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        d=1; enable=1; #10;\n        d=0; enable=0; #10;\n        d=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module d_latch(input d, enable, output reg q); always @(*) if (enable) q = d; endmodule",
    "simInputs": [
      {
        "id": "d",
        "label": "D Input"
      },
      {
        "id": "enable",
        "label": "Enable Level"
      }
    ],
    "simOutputs": [
      {
        "id": "q",
        "label": "Latch Out Q"
      }
    ],
    "simType": "comb",
    "evalFn": "if (inputs.enable) return { q: inputs.d?1:0 }; return { q: env.prev.q || 0 };",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "d": "0",
          "enable": "0"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "d": "0",
          "enable": "1"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "d": "1",
          "enable": "0"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "d": "1",
          "enable": "1"
        },
        "out": {
          "q": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_q": "0",
      "r1_q": "1",
      "r2_q": "0",
      "r3_q": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 23,
    "slug": "bai-20-d-ff",
    "title": "Bài 23: Flip-Flop D (D Flip-Flop Edge-Triggered)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế Flip-Flop D kích hoạt sườn dương clock `posedge clk` có tín hiệu Reset bất đồng bộ tích cực thấp `rst_n`.",
    "analysis": "Tại sườn lên xung clock, nếu `rst_n=0` thì `q=0`, ngược lại `q <= d`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3; IO_LOC \"d\" 4;\nIO_LOC \"q\" 10;",
    "truthTable": [
      {
        "rst_n": "0",
        "clk": "X",
        "q": "0 (Reset)"
      },
      {
        "rst_n": "1",
        "clk": "posedge",
        "q": "D (Cập nhật sườn lên)"
      }
    ],
    "template": "module d_ff (\n    input wire clk,\n    input wire rst_n,\n    input wire d,\n    output reg q\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n        end else begin\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, d; wire q;\n    d_ff uut (.clk(clk), .rst_n(rst_n), .d(d), .q(q));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; d=1; #12;\n        rst_n=1; #20;\n        d=0; #20;\n        $finish;\n    end\nendmodule",
    "solution": "module d_ff(input clk, rst_n, d, output reg q); always @(posedge clk or negedge rst_n) if (!rst_n) q <= 0; else q <= d; endmodule",
    "simInputs": [
      {
        "id": "d",
        "label": "D Input"
      },
      {
        "id": "rst_n",
        "label": "Reset (Active-Low)"
      }
    ],
    "simOutputs": [
      {
        "id": "q",
        "label": "FF Out Q"
      }
    ],
    "simType": "clock",
    "evalFn": "if (!inputs.rst_n) return { q: 0 }; return { q: inputs.d?1:0 };",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "d": "0",
          "rst_n": "0"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "d": "0",
          "rst_n": "1"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "d": "1",
          "rst_n": "0"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "d": "1",
          "rst_n": "1"
        },
        "out": {
          "q": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_q": "0",
      "r1_q": "1",
      "r2_q": "0",
      "r3_q": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 24,
    "slug": "bai-21-t-ff",
    "title": "Bài 24: Flip-Flop T (Toggle Flip-Flop) & Flip-Flop JK",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế Flip-Flop T đảo trạng thái ngõ ra `q` mỗi khi `t=1` tại sườn lên của clock.",
    "analysis": "Nếu `t=1`, `q <= ~q`. Nếu `t=0`, `q <= q`. Ứng dụng phổ biến nhất của T-FF là bộ chia tần số 2.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3; IO_LOC \"t\" 4;\nIO_LOC \"q\" 10;",
    "truthTable": [
      {
        "t": "0",
        "q_next": "q (Giữ nguyên)"
      },
      {
        "t": "1",
        "q_next": "~q (Đảo trạng thái)"
      }
    ],
    "template": "module t_ff (\n    input wire clk,\n    input wire rst_n,\n    input wire t,\n    output reg q\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n        end else if (t) begin\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, t; wire q;\n    t_ff uut (.clk(clk), .rst_n(rst_n), .t(t), .q(q));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; t=1; #12;\n        rst_n=1; #40;\n        t=0; #20;\n        $finish;\n    end\nendmodule",
    "solution": "module t_ff(input clk, rst_n, t, output reg q); always @(posedge clk or negedge rst_n) if (!rst_n) q <= 0; else if (t) q <= ~q; endmodule",
    "simInputs": [
      {
        "id": "t",
        "label": "Toggle T"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "q",
        "label": "T-FF Out Q"
      }
    ],
    "simType": "clock",
    "evalFn": "if (!inputs.rst_n) return { q: 0 }; const prev = env.prev.q || 0; return { q: inputs.t ? (prev?0:1) : prev };",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "t": "0",
          "rst_n": "0"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "t": "0",
          "rst_n": "1"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "t": "1",
          "rst_n": "0"
        },
        "out": {
          "q": ""
        }
      },
      {
        "in": {
          "t": "1",
          "rst_n": "1"
        },
        "out": {
          "q": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_q": "0",
      "r1_q": "1",
      "r2_q": "0",
      "r3_q": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 25,
    "slug": "bai-22-reg4bit",
    "title": "Bài 25: Thanh ghi dữ liệu 4-bit (4-bit Data Register)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế thanh ghi 4-bit chốt dữ liệu song song `d[3:0]` vào `q[3:0]` khi tín hiệu nạp `load=1` tại sườn lên clock.",
    "analysis": "Tải song song (Parallel Load): Khi `load=1`, `q <= d`; ngược lại `q <= q`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"load\" 3;\nIO_LOC \"q[0]\" 10; IO_LOC \"q[1]\" 11; IO_LOC \"q[2]\" 13; IO_LOC \"q[3]\" 14;",
    "truthTable": [
      {
        "load": "1",
        "q": "D[3:0] (Song song)"
      },
      {
        "load": "0",
        "q": "Q_prev (Lưu trữ)"
      }
    ],
    "template": "module reg_4bit (\n    input wire clk,\n    input wire rst_n,\n    input wire load,\n    input wire [3:0] d,\n    output reg [3:0] q\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n        end else if (load) begin\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, load; reg [3:0] d; wire [3:0] q;\n    reg_4bit uut (.clk(clk), .rst_n(rst_n), .load(load), .d(d), .q(q));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; load=1; d=4'b1010; #12;\n        rst_n=1; #20;\n        load=0; d=4'b1111; #20;\n        $finish;\n    end\nendmodule",
    "solution": "module reg_4bit(input clk, rst_n, load, input [3:0] d, output reg [3:0] q); always @(posedge clk or negedge rst_n) if (!rst_n) q <= 0; else if (load) q <= d; endmodule",
    "simInputs": [
      {
        "id": "load",
        "label": "Load Enable"
      },
      {
        "id": "d0",
        "label": "D0"
      },
      {
        "id": "d1",
        "label": "D1"
      }
    ],
    "simOutputs": [
      {
        "id": "q0",
        "label": "Q0"
      },
      {
        "id": "q1",
        "label": "Q1"
      }
    ],
    "simType": "clock",
    "evalFn": "if (!inputs.rst_n) return {q0:0,q1:0}; if (inputs.load) return {q0:inputs.d0?1:0, q1:inputs.d1?1:0}; return {q0:env.prev.q0||0, q1:env.prev.q1||0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "Xung Clock / Tín hiệu": "Reset (rst_n=0)",
          "d[3:0]": "1010",
          "en": "1"
        },
        "out": {
          "q[3:0] (Ngõ ra 4-bit)": ""
        }
      },
      {
        "in": {
          "Xung Clock / Tín hiệu": "Clock 1 (en=0)",
          "d[3:0]": "1010",
          "en": "0"
        },
        "out": {
          "q[3:0] (Ngõ ra 4-bit)": ""
        }
      },
      {
        "in": {
          "Xung Clock / Tín hiệu": "Clock 2 (en=1)",
          "d[3:0]": "1010",
          "en": "1"
        },
        "out": {
          "q[3:0] (Ngõ ra 4-bit)": ""
        }
      },
      {
        "in": {
          "Xung Clock / Tín hiệu": "Clock 3 (en=1)",
          "d[3:0]": "0101",
          "en": "1"
        },
        "out": {
          "q[3:0] (Ngõ ra 4-bit)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_q[3:0] (Ngõ ra 4-bit)": "0000",
      "r1_q[3:0] (Ngõ ra 4-bit)": "0000",
      "r2_q[3:0] (Ngõ ra 4-bit)": "1010",
      "r3_q[3:0] (Ngõ ra 4-bit)": "0101"
    },
    "hasNotesBox": true
  },
  {
    "id": 26,
    "slug": "bai-23-shift-reg",
    "title": "Bài 26: Thanh ghi dịch 4-bit (4-bit Shift Register PIPO/SIPO)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế thanh ghi dịch 4-bit dịch bit nối tiếp `din` từ trái sang phải tại mỗi nhịp xung clock: `q <= {din, q[3:1]}`.",
    "analysis": "Dịch bit nối tiếp (Serial In Parallel Out - SIPO): Tạo mạch chạy LED đuôi đuổi đẹp mắt.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"din\" 3;\nIO_LOC \"q[0]\" 10; IO_LOC \"q[1]\" 11; IO_LOC \"q[2]\" 13; IO_LOC \"q[3]\" 14;",
    "truthTable": [
      {
        "din": "1",
        "q_after_clock": "{1'b1, q[3:1]}"
      }
    ],
    "template": "module shift_reg_4bit (\n    input wire clk,\n    input wire rst_n,\n    input wire din,\n    output reg [3:0] q\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n        end else begin\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, din; wire [3:0] q;\n    shift_reg_4bit uut (.clk(clk), .rst_n(rst_n), .din(din), .q(q));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; din=1; #12; rst_n=1; #10;\n        din=0; #10; din=1; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module shift_reg_4bit(input clk, rst_n, din, output reg [3:0] q); always @(posedge clk or negedge rst_n) if (!rst_n) q <= 0; else q <= {din, q[3:1]}; endmodule",
    "simInputs": [
      {
        "id": "din",
        "label": "Serial Din"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "q0",
        "label": "Q[0]"
      },
      {
        "id": "q1",
        "label": "Q[1]"
      },
      {
        "id": "q2",
        "label": "Q[2]"
      },
      {
        "id": "q3",
        "label": "Q[3]"
      }
    ],
    "simType": "shift",
    "evalFn": "if (!inputs.rst_n) return {q0:0,q1:0,q2:0,q3:0}; const prevVal = ((env.prev.q3||0)<<3)+((env.prev.q2||0)<<2)+((env.prev.q1||0)<<1)+(env.prev.q0||0); const nxt = ((inputs.din?1:0)<<3) | (prevVal >> 1); return {q0:nxt&1?1:0, q1:nxt&2?1:0, q2:nxt&4?1:0, q3:nxt&8?1:0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "Xung Clock": "Reset (rst_n=0)",
          "din": "0"
        },
        "out": {
          "q[3:0] (4-bit shift)": ""
        }
      },
      {
        "in": {
          "Xung Clock": "Nhịp Clock 1",
          "din": "1"
        },
        "out": {
          "q[3:0] (4-bit shift)": ""
        }
      },
      {
        "in": {
          "Xung Clock": "Nhịp Clock 2",
          "din": "0"
        },
        "out": {
          "q[3:0] (4-bit shift)": ""
        }
      },
      {
        "in": {
          "Xung Clock": "Nhịp Clock 3",
          "din": "1"
        },
        "out": {
          "q[3:0] (4-bit shift)": ""
        }
      },
      {
        "in": {
          "Xung Clock": "Nhịp Clock 4",
          "din": "1"
        },
        "out": {
          "q[3:0] (4-bit shift)": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_q[3:0] (4-bit shift)": "0000",
      "r1_q[3:0] (4-bit shift)": "0001",
      "r2_q[3:0] (4-bit shift)": "0010",
      "r3_q[3:0] (4-bit shift)": "0101",
      "r4_q[3:0] (4-bit shift)": "1011"
    },
    "hasNotesBox": true
  },
  {
    "id": 27,
    "slug": "bai-24-bin-counter",
    "title": "Bài 27: Bộ đếm nhị phân 6-bit (6-bit Binary Counter)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ đếm nhị phân 6-bit tăng giá trị `count` lên 1 sau mỗi sườn clock khi `enable=1`. Kết nối ra 6 LED onboard Tang Nano 9K.",
    "analysis": "Bộ đếm tăng `count <= count + 1'b1`. Đèn LED hiển thị mã nhị phân từ 0 đến 63.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"enable\" 3;\nIO_LOC \"count[0]\" 10; IO_LOC \"count[1]\" 11; IO_LOC \"count[2]\" 13; IO_LOC \"count[3]\" 14; IO_LOC \"count[4]\" 15; IO_LOC \"count[5]\" 16;",
    "truthTable": [
      {
        "enable": "1",
        "count": "count + 1"
      },
      {
        "enable": "0",
        "count": "count (Stop)"
      }
    ],
    "template": "module bin_counter_6bit (\n    input wire clk,\n    input wire rst_n,\n    input wire enable,\n    output reg [5:0] count\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n        end else if (enable) begin\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, enable; wire [5:0] count;\n    bin_counter_6bit uut (.clk(clk), .rst_n(rst_n), .enable(enable), .count(count));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; enable=1; #12; rst_n=1; #100;\n        $finish;\n    end\nendmodule",
    "solution": "module bin_counter_6bit(input clk, rst_n, enable, output reg [5:0] count); always @(posedge clk or negedge rst_n) if (!rst_n) count <= 0; else if (enable) count <= count + 1; endmodule",
    "simInputs": [
      {
        "id": "enable",
        "label": "Enable Counter"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "c0",
        "label": "Bit 0"
      },
      {
        "id": "c1",
        "label": "Bit 1"
      },
      {
        "id": "c2",
        "label": "Bit 2"
      },
      {
        "id": "c3",
        "label": "Bit 3"
      }
    ],
    "simType": "counter",
    "evalFn": "if (!inputs.rst_n) return {c0:0,c1:0,c2:0,c3:0}; const c = ((env.prev.c3||0)<<3)+((env.prev.c2||0)<<2)+((env.prev.c1||0)<<1)+(env.prev.c0||0); const nxt = inputs.enable ? (c + 1)%16 : c; return {c0:nxt&1?1:0, c1:nxt&2?1:0, c2:nxt&4?1:0, c3:nxt&8?1:0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "enable": "0",
          "rst_n": "0"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "enable": "0",
          "rst_n": "1"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "enable": "1",
          "rst_n": "0"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "enable": "1",
          "rst_n": "1"
        },
        "out": {
          "c0": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_c0": "0",
      "r1_c0": "1",
      "r2_c0": "0",
      "r3_c0": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 28,
    "slug": "bai-25-updown-counter",
    "title": "Bài 28: Bộ đếm Đếm Lên / Đếm Xuống (6-bit Up/Down Counter)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ đếm 6-bit đảo chiều đếm linh hoạt: khi `up_down=1` đếm tăng (`count + 1`), khi `up_down=0` đếm giảm (`count - 1`).",
    "analysis": "`count <= up_down ? (count + 1'b1) : (count - 1'b1)`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"up_down\" 3;\nIO_LOC \"count[0]\" 10; IO_LOC \"count[1]\" 11; IO_LOC \"count[2]\" 13;",
    "truthTable": [
      {
        "up_down": "1",
        "count": "count + 1 (Đếm lên)"
      },
      {
        "up_down": "0",
        "count": "count - 1 (Đếm xuống)"
      }
    ],
    "template": "module updown_counter (\n    input wire clk,\n    input wire rst_n,\n    input wire up_down,\n    output reg [5:0] count\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n    // VIẾT MÃ VERILOG CỦA BẠN TẠI ĐÂY:\n    \n        end else begin\n            if (up_down)\n            else\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, up_down; wire [5:0] count;\n    updown_counter uut (.clk(clk), .rst_n(rst_n), .up_down(up_down), .count(count));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; up_down=1; #12; rst_n=1; #50;\n        up_down=0; #40;\n        $finish;\n    end\nendmodule",
    "solution": "module updown_counter(input clk, rst_n, up_down, output reg [5:0] count); always @(posedge clk or negedge rst_n) if (!rst_n) count <= 0; else count <= up_down ? (count + 1) : (count - 1); endmodule",
    "simInputs": [
      {
        "id": "up_down",
        "label": "Direction (1:Up, 0:Down)"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "c0",
        "label": "Bit 0"
      },
      {
        "id": "c1",
        "label": "Bit 1"
      },
      {
        "id": "c2",
        "label": "Bit 2"
      }
    ],
    "simType": "counter",
    "evalFn": "if (!inputs.rst_n) return {c0:0,c1:0,c2:0}; const c = ((env.prev.c2||0)<<2)+((env.prev.c1||0)<<1)+(env.prev.c0||0); const nxt = inputs.up_down ? (c+1)%8 : (c+7)%8; return {c0:nxt&1?1:0, c1:nxt&2?1:0, c2:nxt&4?1:0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "up_down": "0",
          "rst_n": "0"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "up_down": "0",
          "rst_n": "1"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "up_down": "1",
          "rst_n": "0"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "up_down": "1",
          "rst_n": "1"
        },
        "out": {
          "c0": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_c0": "0",
      "r1_c0": "1",
      "r2_c0": "0",
      "r3_c0": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 29,
    "slug": "bai-26-bcd-counter",
    "title": "Bài 29: Bộ đếm BCD Modulo-10 (BCD Counter 0-9)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế bộ đếm BCD đếm thập phân từ 0 đến 9. Khi giá trị đạt 9 (`4'd9`), nhịp xung tiếp theo quay về 0 và phát xung nhớ `carry_out=1`.",
    "analysis": "Khối `always`: Nếu `count == 4'd9` thì `count <= 4'd0` và `carry_out <= 1'b1`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3;\nIO_LOC \"count[0]\" 10; IO_LOC \"count[1]\" 11; IO_LOC \"count[2]\" 13; IO_LOC \"count[3]\" 14;",
    "truthTable": [
      {
        "count": "0 .. 8",
        "next": "count + 1",
        "carry_out": "0"
      },
      {
        "count": "9",
        "next": "0",
        "carry_out": "1"
      }
    ],
    "template": "module bcd_counter (\n    input wire clk,\n    input wire rst_n,\n    output reg [3:0] count,\n    output reg       carry_out\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n            count     <= 4'd0;\n            carry_out <= 1'b0;\n        end else begin\n            if (count == 4'd9) begin\n                count     <= 4'd0;\n                carry_out <= 1'b1;\n            end else begin\n                count     <= count + 1'b1;\n                carry_out <= 1'b0;\n            end\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n; wire [3:0] count; wire carry_out;\n    bcd_counter uut (.clk(clk), .rst_n(rst_n), .count(count), .carry_out(carry_out));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; #12; rst_n=1; #150;\n        $finish;\n    end\nendmodule",
    "solution": "module bcd_counter(input clk, rst_n, output reg [3:0] count, output reg carry_out); always @(posedge clk or negedge rst_n) if (!rst_n) begin count <= 0; carry_out <= 0; end else if (count == 9) begin count <= 0; carry_out <= 1; end else begin count <= count + 1; carry_out <= 0; end endmodule",
    "simInputs": [
      {
        "id": "rst_n",
        "label": "Reset (Active-Low)"
      }
    ],
    "simOutputs": [
      {
        "id": "c0",
        "label": "BCD[0]"
      },
      {
        "id": "c1",
        "label": "BCD[1]"
      },
      {
        "id": "c2",
        "label": "BCD[2]"
      },
      {
        "id": "c3",
        "label": "BCD[3]"
      },
      {
        "id": "co",
        "label": "Carry Out"
      }
    ],
    "simType": "counter",
    "evalFn": "if (!inputs.rst_n) return {c0:0,c1:0,c2:0,c3:0,co:0}; const c = ((env.prev.c3||0)<<3)+((env.prev.c2||0)<<2)+((env.prev.c1||0)<<1)+(env.prev.c0||0); const nxt = (c >= 9) ? 0 : c + 1; const co = (c === 9) ? 1 : 0; return {c0:nxt&1?1:0, c1:nxt&2?1:0, c2:nxt&4?1:0, c3:nxt&8?1:0, co:co};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "rst_n": "0"
        },
        "out": {
          "c0": ""
        }
      },
      {
        "in": {
          "rst_n": "1"
        },
        "out": {
          "c0": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_c0": "0",
      "r1_c0": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 30,
    "slug": "bai-27-clk-divider",
    "title": "Bài 30: Mạch chia tần số clock 27MHz xuống 1Hz (Clock Divider)",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế mạch chia tần số từ xung clock 27MHz trên chân PIN 52 Tang Nano 9K xuống tín hiệu xung nhịp 1Hz (1 giây đảo 1 lần).",
    "analysis": "Bộ chia tần số dùng thanh ghi đếm `cnt`: Đếm từ 0 đến `13_499_999` (bằng 27MHz / 2 - 1). Mỗi khi đạt mốc, đảo `clk_1hz <= ~clk_1hz`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3;\nIO_LOC \"clk_1hz\" 10;",
    "truthTable": [
      {
        "cnt": "0 .. 13499999",
        "clk_1hz": "Giữ nguyên"
      },
      {
        "cnt": "13500000",
        "clk_1hz": "~clk_1hz (Đảo mức)"
      }
    ],
    "template": "module clk_divider (\n    input wire clk,       // 27MHz\n    input wire rst_n,\n    output reg clk_1hz\n);\n\n    // Chu kỳ chia 27MHz -> 1Hz (mô phỏng rút ngắn cnt_max = 5)\n    parameter CNT_MAX = 24'd13_499_999;\n    reg [23:0] cnt;\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n            cnt     <= 24'd0;\n            clk_1hz <= 1'b0;\n        end else begin\n            if (cnt == CNT_MAX) begin\n                cnt     <= 24'd0;\n                clk_1hz <= ~clk_1hz;\n            end else begin\n                cnt <= cnt + 1'b1;\n            end\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n; wire clk_out;\n    clk_divider #(.CNT_MAX(4)) uut (.clk(clk), .rst_n(rst_n), .clk_1hz(clk_out));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; #12; rst_n=1; #200;\n        $finish;\n    end\nendmodule",
    "solution": "module clk_divider #(parameter CNT_MAX=13499999)(input clk, rst_n, output reg clk_1hz); reg [23:0] cnt; always @(posedge clk or negedge rst_n) if (!rst_n) begin cnt <= 0; clk_1hz <= 0; end else if (cnt == CNT_MAX) begin cnt <= 0; clk_1hz <= ~clk_1hz; end else cnt <= cnt + 1; endmodule",
    "simInputs": [
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "clk_1hz",
        "label": "Pulse 1Hz Out"
      }
    ],
    "simType": "clock",
    "evalFn": "if (!inputs.rst_n) return {clk_1hz:0}; const prev = env.prev.clk_1hz || 0; return {clk_1hz: prev ? 0 : 1};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "rst_n": "0"
        },
        "out": {
          "clk_1hz": ""
        }
      },
      {
        "in": {
          "rst_n": "1"
        },
        "out": {
          "clk_1hz": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_clk_1hz": "0",
      "r1_clk_1hz": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 31,
    "slug": "bai-28-debounce",
    "title": "Bài 31: Mạch chống rung phím (Key Debouncer) & Đạo sườn",
    "category": "sequential",
    "categoryName": "Phần D: Mạch Tuần Tự",
    "difficulty": "Trung bình",
    "desc": "Thiết kế mạch chống rung phím bấm cơ học (Key Debounce) kết hợp tạo xung kích sườn (One-shot pulse) khi nhấn nút.",
    "analysis": "Nút nhấn cơ học gây ra rung phím (Bouncing) 5ms-20ms. Bộ chống rung dùng bộ đếm đồng bộ hoặc 3 Flip-Flop nối tiếp.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"btn_in\" 3;\nIO_LOC \"btn_clean\" 10; IO_LOC \"btn_pulse\" 11;",
    "truthTable": [
      {
        "btn_in": "Bouncing (Nhiễu)",
        "btn_clean": "Ổn định 10ms",
        "btn_pulse": "1 nhịp clock duy nhất"
      }
    ],
    "template": "module key_debouncer (\n    input wire clk,\n    input wire rst_n,\n    input wire btn_in,\n    output reg btn_clean,\n    output reg btn_pulse\n);\n\n    reg [2:0] ff_chain;\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n            ff_chain  <= 3'b000;\n            btn_clean <= 1'b0;\n            btn_pulse <= 1 me'b0;\n        end else begin\n            ff_chain  <= {ff_chain[1:0], btn_in};\n            btn_clean <= ff_chain[2];\n            btn_pulse <= ff_chain[1] & ~ff_chain[2];\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, btn_in; wire clean, pulse;\n    key_debouncer uut (.clk(clk), .rst_n(rst_n), .btn_in(btn_in), .btn_clean(clean), .btn_pulse(pulse));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; btn_in=0; #12; rst_n=1; #20;\n        btn_in=1; #5; btn_in=0; #5; btn_in=1; #50;\n        $finish;\n    end\nendmodule",
    "solution": "module key_debouncer(input clk, rst_n, btn_in, output reg btn_clean, btn_pulse); reg [2:0] ff; always @(posedge clk or negedge rst_n) if (!rst_n) begin ff <= 0; btn_clean <= 0; btn_pulse <= 0; end else begin ff <= {ff[1:0], btn_in}; btn_clean <= ff[2]; btn_pulse <= ff[1] & ~ff[2]; end endmodule",
    "simInputs": [
      {
        "id": "btn_in",
        "label": "Key Input (Bouncy)"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "clean",
        "label": "Clean Output"
      },
      {
        "id": "pulse",
        "label": "Edge Pulse (1 clk)"
      }
    ],
    "simType": "clock",
    "evalFn": "if (!inputs.rst_n) return {clean:0, pulse:0}; const c = inputs.btn_in?1:0; const prevClean = env.prev.clean||0; const pulse = (c && !prevClean) ? 1 : 0; return {clean:c, pulse:pulse};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "btn_in": "0",
          "rst_n": "0"
        },
        "out": {
          "clean": ""
        }
      },
      {
        "in": {
          "btn_in": "0",
          "rst_n": "1"
        },
        "out": {
          "clean": ""
        }
      },
      {
        "in": {
          "btn_in": "1",
          "rst_n": "0"
        },
        "out": {
          "clean": ""
        }
      },
      {
        "in": {
          "btn_in": "1",
          "rst_n": "1"
        },
        "out": {
          "clean": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_clean": "0",
      "r1_clean": "1",
      "r2_clean": "0",
      "r3_clean": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 32,
    "slug": "bai-29-pwm-led",
    "title": "Bài 32: Bộ điều chế độ rộng xung PWM (8-bit PWM LED Dimmer)",
    "category": "fsm_advanced",
    "categoryName": "Phần E: Ứng Dụng FPGA & FSM",
    "difficulty": "Nâng cao",
    "desc": "Thiết kế bộ điều chế PWM 8-bit thay đổi độ sáng LED onboard Tang Nano 9K dựa trên giá trị chu kỳ nhiệm vụ `duty[7:0]`.",
    "analysis": "Bộ đếm ramp `counter_8bit` tự do đếm 0->255. Nếu `counter < duty` thì `pwm_out = 1`, ngược lại `pwm_out = 0`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3;\nIO_LOC \"pwm_out\" 10;",
    "truthTable": [
      {
        "duty": "8'd64 (25%)",
        "pwm_out": "Mức 1 trong 25% thời gian (LED mờ)"
      },
      {
        "duty": "8'd192 (75%)",
        "pwm_out": "Mức 1 trong 75% thời gian (LED sáng rõ)"
      }
    ],
    "template": "module pwm_led (\n    input wire clk,\n    input wire rst_n,\n    input wire [7:0] duty,\n    output reg pwm_out\n);\n\n    reg [7:0] counter;\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n            counter <= 8'd0;\n            pwm_out <= 1'b0;\n        end else begin\n            counter <= counter + 1'b1;\n            pwm_out <= (counter < duty) ? 1'b1 : 1'b0;\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n; reg [7:0] duty; wire pwm_out;\n    pwm_led uut (.clk(clk), .rst_n(rst_n), .duty(duty), .pwm_out(pwm_out));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; duty=8'd64; #12; rst_n=1; #500;\n        duty=8'd192; #500;\n        $finish;\n    end\nendmodule",
    "solution": "module pwm_led(input clk, rst_n, input [7:0] duty, output reg pwm_out); reg [7:0] cnt; always @(posedge clk or negedge rst_n) if (!rst_n) begin cnt <= 0; pwm_out <= 0; end else begin cnt <= cnt + 1; pwm_out <= (cnt < duty); end endmodule",
    "simInputs": [
      {
        "id": "d50",
        "label": "Duty 50%"
      },
      {
        "id": "d90",
        "label": "Duty 90%"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "pwm",
        "label": "PWM Signal"
      }
    ],
    "simType": "pwm",
    "evalFn": "if (!inputs.rst_n) return {pwm:0}; const tick = env.clkTick % 10; const duty = inputs.d90 ? 9 : (inputs.d50 ? 5 : 2); return {pwm: tick < duty ? 1 : 0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "d50": "0"
        },
        "out": {
          "pwm": ""
        }
      },
      {
        "in": {
          "d50": "1"
        },
        "out": {
          "pwm": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_pwm": "0",
      "r1_pwm": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 33,
    "slug": "bai-30-fsm-traffic",
    "title": "Bài 33: Máy trạng thái FSM Đèn giao thông 3 màu (Traffic Light FSM)",
    "category": "fsm_advanced",
    "categoryName": "Phần E: Ứng Dụng FPGA & FSM",
    "difficulty": "Nâng cao",
    "desc": "Thiết kế bộ điều khiển đèn giao thông FSM 3 trạng thái: Xanh (GREEN) -> Vàng (YELLOW) -> Đỏ (RED) điều khiển dải LED.",
    "analysis": "FSM 3 khối Moore chuẩn: Đèn Xanh sáng 10 nhịp, Vàng sáng 3 nhịp, Đỏ sáng 8 nhịp.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"rst_n\" 3;\nIO_LOC \"red\" 10; IO_LOC \"yellow\" 11; IO_LOC \"green\" 13;",
    "truthTable": [
      {
        "State": "GREEN",
        "Outputs": "red=0, yellow=0, green=1"
      },
      {
        "State": "YELLOW",
        "Outputs": "red=0, yellow=1, green=0"
      },
      {
        "State": "RED",
        "Outputs": "red=1, yellow=0, green=0"
      }
    ],
    "template": "module traffic_light_fsm (\n    input wire clk,\n    input wire rst_n,\n    output reg red,\n    output reg yellow,\n    output reg green\n);\n\n    localparam RED    = 2'b00;\n    localparam YELLOW = 2'b01;\n    localparam GREEN  = 2'b10;\n\n    reg [1:0] state, next_state;\n    reg [3:0] timer;\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n            state <= RED;\n            timer <= 4'd0;\n        end else begin\n            if (state != next_state) begin\n                state <= next_state;\n                timer <= 4'd0;\n            end else begin\n                timer <= timer + 1'b1;\n            end\n        end\n    end\n\n    always @(*) begin\n        next_state = state;\n        case (state)\n            RED:    if (timer >= 4'd8) next_state = GREEN;\n            GREEN:  if (timer >= 4'd6) next_state = YELLOW;\n            YELLOW: if (timer >= 4'd3) next_state = RED;\n            default: next_state = RED;\n        endcase\n    end\n\n    always @(*) begin\n        red    = (state == RED);\n        yellow = (state == YELLOW);\n        green  = (state == GREEN);\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n; wire r, y, g;\n    traffic_light_fsm uut (.clk(clk), .rst_n(rst_n), .red(r), .yellow(y), .green(g));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; #12; rst_n=1; #300;\n        $finish;\n    end\nendmodule",
    "solution": "module traffic_light_fsm(input clk, rst_n, output reg red, yellow, green); localparam R=0,Y=1,G=2; reg [1:0] st; reg [3:0] tm; always @(posedge clk or negedge rst_n) if(!rst_n) begin st<=R; tm<=0; end else if(st==R && tm>=8) begin st<=G; tm<=0; end else if(st==G && tm>=6) begin st<=Y; tm<=0; end else if(st==Y && tm>=3) begin st<=R; tm<=0; end else tm<=tm+1; always @(*) begin red=(st==R); yellow=(st==Y); green=(st==G); end endmodule",
    "simInputs": [
      {
        "id": "rst_n",
        "label": "Reset FSM"
      }
    ],
    "simOutputs": [
      {
        "id": "red",
        "label": "Đỏ (RED)"
      },
      {
        "id": "yellow",
        "label": "Vàng (YELLOW)"
      },
      {
        "id": "green",
        "label": "Xanh (GREEN)"
      }
    ],
    "simType": "fsm",
    "evalFn": "if (!inputs.rst_n) return {red:1, yellow:0, green:0}; const phase = Math.floor(env.clkTick / 4) % 3; return {red: phase===0?1:0, green: phase===1?1:0, yellow: phase===2?1:0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "rst_n": "0"
        },
        "out": {
          "red": ""
        }
      },
      {
        "in": {
          "rst_n": "1"
        },
        "out": {
          "red": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_red": "0",
      "r1_red": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 34,
    "slug": "bai-31-seq-detect",
    "title": "Bài 34: Máy trạng thái FSM Nhận dạng chuỗi bít '101' (Sequence Detector FSM)",
    "category": "fsm_advanced",
    "categoryName": "Phần E: Ứng Dụng FPGA & FSM",
    "difficulty": "Nâng cao",
    "desc": "Thiết kế máy trạng thái FSM phát hiện chuỗi dữ liệu nối tiếp `101`. Khi phát hiện đủ 3 bit `1 -> 0 -> 1`, phát xung `found=1`.",
    "analysis": "FSM Mealy 3 trạng thái: S0 (Chờ bit 1), S1 (Đã có bit 1), S2 (Đã có chuỗi 10). Khi ở S2 và nhận `in_bit=1`, ngõ ra `found = 1`.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"in_bit\" 3;\nIO_LOC \"found\" 10;",
    "truthTable": [
      {
        "Input Stream": "1 -> 0 -> 1",
        "Found Signal": "1 (Phát hiện chuỗi '101')"
      }
    ],
    "template": "module seq_detect_101 (\n    input wire clk,\n    input wire rst_n,\n    input wire in_bit,\n    output reg found\n);\n\n    localparam S0 = 2'b00; // IDLE\n    localparam S1 = 2'b01; // Got '1'\n    localparam S2 = 2'b10; // Got '10'\n\n    reg [1:0] state, next_state;\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n)\n            state <= S0;\n        else\n            state <= next_state;\n    end\n\n    always @(*) begin\n        next_state = state;\n        case (state)\n            S0: next_state = in_bit ? S1 : S0;\n            S1: next_state = in_bit ? S1 : S2;\n            S2: next_state = in_bit ? S1 : S0;\n            default: next_state = S0;\n        endcase\n    end\n\n    always @(*) begin\n        found = (state == S2) && (in_bit == 1'b1);\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, in_bit; wire found;\n    seq_detect_101 uut (.clk(clk), .rst_n(rst_n), .in_bit(in_bit), .found(found));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; in_bit=0; #12; rst_n=1;\n        in_bit=1; #10;\n        in_bit=0; #10;\n        in_bit=1; #10; // Found!\n        in_bit=0; #10;\n        $finish;\n    end\nendmodule",
    "solution": "module seq_detect_101(input clk, rst_n, in_bit, output reg found); localparam S0=0,S1=1,S2=2; reg [1:0] st, nxt; always @(posedge clk or negedge rst_n) if(!rst_n) st<=S0; else st<=nxt; always @(*) begin case(st) S0: nxt=in_bit?S1:S0; S1: nxt=in_bit?S1:S2; S2: nxt=in_bit?S1:S0; default: nxt=S0; endcase found=(st==S2)&&in_bit; end endmodule",
    "simInputs": [
      {
        "id": "in_bit",
        "label": "Serial Bit In"
      },
      {
        "id": "rst_n",
        "label": "Reset FSM"
      }
    ],
    "simOutputs": [
      {
        "id": "found",
        "label": "Found '101' Match"
      }
    ],
    "simType": "fsm",
    "evalFn": "if (!inputs.rst_n) return {found:0}; const history = env.prev.hist || []; const newHist = [...history.slice(-2), inputs.in_bit?1:0]; const match = newHist.join('') === '101'; env.prev.hist = newHist; return {found: match?1:0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "in_bit": "0",
          "rst_n": "0"
        },
        "out": {
          "found": ""
        }
      },
      {
        "in": {
          "in_bit": "0",
          "rst_n": "1"
        },
        "out": {
          "found": ""
        }
      },
      {
        "in": {
          "in_bit": "1",
          "rst_n": "0"
        },
        "out": {
          "found": ""
        }
      },
      {
        "in": {
          "in_bit": "1",
          "rst_n": "1"
        },
        "out": {
          "found": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_found": "0",
      "r1_found": "1",
      "r2_found": "0",
      "r3_found": "1"
    },
    "hasNotesBox": true
  },
  {
    "id": 35,
    "slug": "bai-32-digital-dice",
    "title": "Bài 35: Mạch xúc xắc điện tử 0-5 (Digital Dice LFSR / Counter)",
    "category": "fsm_advanced",
    "categoryName": "Phần E: Ứng Dụng FPGA & FSM",
    "difficulty": "Nâng cao",
    "desc": "Thiết kế mạch xúc xắc điện tử ngẫu nhiên đếm tuần hoàn 0 đến 5 ở tốc độ siêu nhanh (27MHz). Khi người chơi nhấn nút dừng SW1, kết quả được chốt giữ lại trên LED.",
    "analysis": "Khi giữ nút `roll=1`, bộ đếm chạy cực nhanh. Khi nhả nút `roll=0`, bộ đếm dừng lại tại giá trị ngẫu nhiên bất kỳ từ 0 đến 5.",
    "cst": "IO_LOC \"clk\" 52; IO_LOC \"roll\" 3;\nIO_LOC \"dice[0]\" 10; IO_LOC \"dice[1]\" 11; IO_LOC \"dice[2]\" 13;",
    "truthTable": [
      {
        "roll": "1 (Nhấn giữ)",
        "dice": "Xoay số siêu nhanh 0 -> 5 -> 0"
      },
      {
        "roll": "0 (Nhả nút)",
        "dice": "Khóa số ngẫu nhiên cuối cùng"
      }
    ],
    "template": "module digital_dice (\n    input wire clk,\n    input wire rst_n,\n    input wire roll,\n    output reg [2:0] dice\n);\n\n    always @(posedge clk or negedge rst_n) begin\n        if (!rst_n) begin\n            dice <= 3'd0;\n        end else if (roll) begin\n            if (dice == 3'd5)\n                dice <= 3'd0;\n            else\n                dice <= dice + 1'b1;\n        end\n    end\n\nendmodule",
    "testbench": "`timescale 1ns/1ns\nmodule tb;\n    reg clk, rst_n, roll; wire [2:0] dice;\n    digital_dice uut (.clk(clk), .rst_n(rst_n), .roll(roll), .dice(dice));\n    initial begin clk=0; forever #5 clk=~clk; end\n    initial begin\n        $dumpfile(\"dump.vcd\"); $dumpvars(0, tb);\n        rst_n=0; roll=1; #12; rst_n=1; #100;\n        roll=0; #50;\n        $finish;\n    end\nendmodule",
    "solution": "module digital_dice(input clk, rst_n, roll, output reg [2:0] dice); always @(posedge clk or negedge rst_n) if(!rst_n) dice<=0; else if(roll) dice <= (dice==5)?0:(dice+1); endmodule",
    "simInputs": [
      {
        "id": "roll",
        "label": "Lắc Xúc Xắc (Roll)"
      },
      {
        "id": "rst_n",
        "label": "Reset"
      }
    ],
    "simOutputs": [
      {
        "id": "d0",
        "label": "Dice Bit 0"
      },
      {
        "id": "d1",
        "label": "Dice Bit 1"
      },
      {
        "id": "d2",
        "label": "Dice Bit 2"
      }
    ],
    "simType": "counter",
    "evalFn": "if (!inputs.rst_n) return {d0:0,d1:0,d2:0}; const prev = ((env.prev.d2||0)<<2)+((env.prev.d1||0)<<1)+(env.prev.d0||0); const nxt = inputs.roll ? (prev >= 5 ? 0 : prev + 1) : prev; return {d0:nxt&1?1:0, d1:nxt&2?1:0, d2:nxt&4?1:0};",
    "exampleCode": "// VÍ DỤ MINH HỌA VÀ HƯỚNG DẪN CÚ PHÁP THAM KHẢO\n// Module mẫu thể hiện cách khai báo cổng và viết câu lệnh assign / always:\nmodule example_guide (\n    input wire in_a,\n    input wire in_b,\n    output wire out_y\n);\n    // Sử dụng từ khóa assign hoặc khối always @(*) để tính ngõ ra\n    assign out_y = in_a & in_b; // Phép toán ví dụ mẫu\nendmodule",
    "fillableTruthTable": [
      {
        "in": {
          "roll": "0",
          "rst_n": "0"
        },
        "out": {
          "d0": ""
        }
      },
      {
        "in": {
          "roll": "0",
          "rst_n": "1"
        },
        "out": {
          "d0": ""
        }
      },
      {
        "in": {
          "roll": "1",
          "rst_n": "0"
        },
        "out": {
          "d0": ""
        }
      },
      {
        "in": {
          "roll": "1",
          "rst_n": "1"
        },
        "out": {
          "d0": ""
        }
      }
    ],
    "expectedTruthTable": {
      "r0_d0": "0",
      "r1_d0": "1",
      "r2_d0": "0",
      "r3_d0": "1"
    },
    "hasNotesBox": true
  }
];
