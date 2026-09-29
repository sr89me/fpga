import os
import subprocess
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.secret_key = 'tang_nano_9k_secret_key'

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json(silent=True) or request.form
    code = data.get('code', '')
    tb_code = data.get('tb_code', '')

    with open('student_code.v', 'w', encoding='utf-8') as f:
        f.write(code)
    with open('tb.v', 'w', encoding='utf-8') as f:
        f.write(tb_code)

    if os.path.exists('dump.vcd'):
        try: os.remove('dump.vcd')
        except: pass

    try:
        compile_process = subprocess.run(
            ['iverilog', '-o', 'sim.vvp', 'student_code.v', 'tb.v'],
            capture_output=True, text=True, check=True
        )
        sim_process = subprocess.run(
            ['vvp', 'sim.vvp'],
            capture_output=True, text=True, check=True
        )
        output = "Biên dịch iverilog thành công!\n\n--- Kết quả ---\n" + sim_process.stdout
        has_vcd = os.path.exists('dump.vcd')
        return jsonify({"status": "success", "output": output, "has_vcd": has_vcd})
    except Exception as e:
        return jsonify({"status": "error", "output": f"Lỗi biên dịch hoặc iverilog chưa được cài: {str(e)}", "has_vcd": False})

@app.route('/open_waveform', methods=['POST'])
def open_waveform():
    if os.path.exists('dump.vcd'):
        try:
            subprocess.Popen(['gtkwave', 'dump.vcd'])
            return jsonify({"status": "success", "message": "Đang mở GTKWave..."})
        except Exception as e:
            return jsonify({"status": "error", "message": f"Không mở được GTKWave: {str(e)}"})
    return jsonify({"status": "error", "message": "Không tìm thấy file dump.vcd!"})

if __name__ == '__main__':
    print("Serving FPGA Web App on http://localhost:5000 ...")
    app.run(debug=True, port=5000)
