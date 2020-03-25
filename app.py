from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/submit', methods=['POST'])
def post():
    data = request.json
    try:
        with open("data/test") as f:
            f.write(data)
            f.close()
            return "Success"
    except:
        return "Error"


if __name__ == "__main__":
    app.run(debug=True)
