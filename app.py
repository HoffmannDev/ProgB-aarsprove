from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    f = open("data/test", "r")
    tables = f.read()
    f.close()
    return render_template("index.html", tables=tables)

@app.route('/submit', methods=['POST'])
def post():
    data = request.form['tables']
    print(data)
    try:
        f = open("data/test", "w+")
        f.write(data)
        f.close()
        return "Success"
    except:
        return "Error"


if __name__ == "__main__":
    app.run(debug=True)
