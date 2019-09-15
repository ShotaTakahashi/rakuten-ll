# -*- coding: utf-8 -*-
from flask import Flask
from flask import abort, jsonify, request
from search import all_search
from operate_guide import show_guide, create_guide, update_guide

app = Flask(__name__)


@app.route('/guides/search/', methods=['GET'])
def all_search_get():
    if request.method == 'GET':
        try:
            request_param = request.args
            return all_search.get(request_param)
        except Exception:
            abort(404)


@app.route('/guides/guide/', methods=['GET', 'POST', 'PUT'])
def operate_user():
    if request.method == 'GET':
        try:
            guide_id = request.args.get("guide_id")
            return show_guide.get_guide_from_db(guide_id)
        except show_guide.NotFoundGuideException:
            abort(404)
    elif request.method == 'POST':
        # TODO:　Add how to get the new user's data.
        response = jsonify()
        response.status_code = 200
        return create_guide.insert_guide_to_db(response)
    elif request.method == 'PUT':
        guide_id = request.args.get("guide_id")
        update_info = jsonify()
        update_info.status_code = 200
        return update_guide.update_guide_to_db(guide_id, update_info)


if __name__ == '__main__':
    app.run(debug=True)
