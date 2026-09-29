
const fs = require('fs');

let exCode = fs.readFileSync('static/js/exercises.js', 'utf8');
eval(exCode.replace('const FPGA_EXERCISES =', 'global.FPGA_EXERCISES ='));

let aiCode = fs.readFileSync('static/js/ai_grader.js', 'utf8');
eval(aiCode.replace('const aiGraderEngine =', 'global.aiGraderEngine ='));

const lab1 = global.FPGA_EXERCISES[0];

// Test 1: Wrong Code (assign led = ~btn) and Wrong Truth Table (r0=0, r1=0)
const wrongTt = { "r0_LED0 (Pin 10)": "0", "r1_LED0 (Pin 10)": "0" };
const res1 = global.aiGraderEngine.gradeSubmission(lab1, "module btn_led (input btn, output led); assign led = ~btn; endmodule", { success: true }, wrongTt);
console.log("TEST 1 (Wrong Code & Wrong TT): Score =", res1.score, "| Status =", res1.status, "| Summary =", res1.summary);
console.log("Checks:", JSON.stringify(res1.checks, null, 2));
console.log("Feedback:", JSON.stringify(res1.feedback, null, 2));

console.log("-----------------------------------------");

// Test 2: Correct Code (assign led = btn) and Correct Truth Table (r0=0, r1=1)
const correctTt = { "r0_LED0 (Pin 10)": "0", "r1_LED0 (Pin 10)": "1" };
const res2 = global.aiGraderEngine.gradeSubmission(lab1, "module btn_led (input wire btn, output wire led); assign led = btn; endmodule", { success: true }, correctTt);
console.log("TEST 2 (Correct Code & Correct TT): Score =", res2.score, "| Status =", res2.status, "| Summary =", res2.summary);
