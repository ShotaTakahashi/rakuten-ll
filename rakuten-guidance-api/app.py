# -*- coding: utf-8 -*-
from flask import Flask, request
from search import all_search
from show_user import show_user

app = Flask(__name__)


@app.route('/teachers/search/', methods=['GET'])
def all_search_get():
    request_param = request.args
    return all_search.get(request_param)


@app.route('/teachers/user', methods=['GET'])
def get_user():
    user_id = request.args.get("user_id")
    return show_user.get_user_from_db(user_id)


if __name__ == '__main__':
    app.run(debug=True)
