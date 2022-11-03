from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.jq15ese.mongodb.net/Cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('shin.html')

@app.route("/shinmini", methods=["POST"])
def web_mars_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']

    doc = {
        'name':name_receive,
        'comment':comment_receive
    }
    db.shinmini.insert_one(doc)

    return jsonify({'msg': '댓글 작성 완료'})

@app.route("/shinmini", methods=["GET"])
def web_mars_get():
    order_list = list(db.shinmini.find({}, {'_id': False}))
    return jsonify({'orders':order_list})

if __name__ == '__main__':
   app.run('0.0.0.0', port=9999, debug=True)