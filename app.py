from flask import Flask, render_template, request, jsonify
from pathlib import Path
import time
import os

app = Flask(__name__)
Path("./data").mkdir(parents=True, exist_ok=True)
os.remove("./data/test")

def add_line(path, line):
    f = open(path, "r").read()
    return f + ("\n" if not f else "") + str(line)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/tables')
def tables():
    ms = int(round(time.time() * 1000))
    tables = open("./data/test", "r").read()
    return str(ms) + "\n" + tables
    
@app.route('/submit', methods=['POST'])
def post():
    data = request.form['table']
    print(data)
    try:
        f = open("./data/test", "w+")
        f.write(add_line(f.tell(), data))
        f.close()
        return "Success"
    except:
        return "Error"

if __name__ == "__main__":
    app.run(debug=True)
