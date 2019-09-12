# -*- coding: utf-8 -*-
from flask import Flask
from flask import abort, jsonify, request
from search import all_search
from operate_user import show_user, create_user, update_user

app = Flask(__name__)


@app.route('/teachers/search/', methods=['GET'])
def all_search_get():
    if request.method == 'GET':
        try:
            request_param = request.args
            return all_search.get(request_param)
        except Exception:
            abort(404)


@app.route('/teachers/user/', methods=['GET', 'POST', 'PUT'])
def operate_user():
    if request.method == 'GET':
        try:
            user_id = request.args.get("user_id")
            return show_user.get_user_from_db(user_id)
        except show_user.NotFoundExceptionError:
            abort(404)
    elif request.method == 'POST':
        # TODO:　Add how to get the new user's data.
        response = jsonify()
        response.status_code = 200
        return create_user.insert_user_to_db(response)
    elif request.method == 'PUT':
        user_id = request.args.get("user_id")
        update_info = jsonify()
        update_info.status_code = 200
        return update_user.update_user_to_db(user_id, update_info)


if __name__ == '__main__':
    app.run(debug=True)
