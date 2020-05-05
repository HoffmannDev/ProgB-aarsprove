from flask import Flask, render_template, request, jsonify
from pathlib import Path
import time
import os

app = Flask(__name__)
Path("./data").mkdir(parents=True, exist_ok=True)

# clear the table log
f = open("./data/test", "w+")
f.write("")
f.close()

#
tablelist = []

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
    tablelist.append(data)
    try:
        f = open("./data/test", "w+")
        f.write("\n".join(tablelist))
        f.close()
        return "Success"
    except:
        return "Error"

if __name__ == "__main__":
    app.run(debug=True)
