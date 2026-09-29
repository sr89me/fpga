`timescale 1ns/1ns
module tb;
    reg clk;
    wire led;

    top uut (
        .clk(clk),
        .led(led)
    );

    initial begin
        clk = 0;
        forever #5 clk = ~clk; // Chu kỳ 10ns
    end

    initial begin
        $dumpfile("dump.vcd");
        $dumpvars(0, tb);
        $monitor("Time=%0t | clk=%b | led=%b", $time, clk, led);
        #200; // Chạy mô phỏng 200ns
        $finish;
    end
endmodule