import flask
import services
import sys
import json
import os
from flask_cors import CORS

"""
    REST API used by the web site to expose images data
    Routes:
        users/all [GET]: expose users list
        images/all [GET]: expose all images with relevant metadata
        images [GET]: expose user's images, parameter: user id
"""

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return "<h1>This is the BV campaign API</p>"


@app.route('/api/v1/resources/users/all', methods=['GET'])
def users():
    users = services.get_users()
    l = list(map(lambda u: u.toJSON(), users))
    return flask.jsonify(l)


@app.route('/api/v1/resources/images/all', methods=['GET'])
def images():
    images = services.get_all_images()
    l = list(map(lambda u: u.toJSON(), images))
    return flask.jsonify(l)


@app.route('/api/v1/resources/images', methods=['GET'])
def user_image():
    if 'id' in flask.request.args:
        id = str(flask.request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id.", 400
    images = services.getUserImages(id)
    l = list(map(lambda u: u.toJSON(), images))
    return flask.jsonify(l)


@app.route('/api/v1/resources/image', methods=['GET'])
def getImage():
    srcDir = os.path.dirname(os.path.realpath(__file__))
    if 'img' in flask.request.args:
        img = str(flask.request.args['img'])
        user = str(flask.request.args['user'])
    else:
        return "Error: No name or img field provided. Please specify .", 400

    return flask.send_from_directory('{0}/../images/{1}/'.format(srcDir, user), img)


if __name__ == "__main__":
    app.run()
