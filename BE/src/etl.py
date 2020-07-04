
from multiprocessing import Pool, Value
from extract_features import extract_features
from predict_emotions import predict_emotions
from EmotionalImage import EmotionalImage
from user import User
import json
from os import walk
import sys
import uuid
import argparse
import logging
import os
"""Extract Transform Load
    Extract: read all images from images directory
    Transform: cleaning, extract features and emotions, modeling the data into User & EmotionalImage
    Load: persist data to DB

"""


class Image:
    def __init__(self, path, name):
        self.path = path
        self.name = name


def get_user(filePath):
    """Construct User, read metadata.json from the user's directory

    Args:
        filePath (string): image file path

    Returns:
        [User]: user class
    """

    try:
        with open(filePath) as json_file:
            data = json.load(json_file)
            user = User(data['name'], uuid.uuid4(),
                        data['sex'], data['age'], data['country'])
            user.images = []
    except EnvironmentError:
        logging.exception(
            'Somthing went wrong during processing file {0}'.format(filePath))
    return user


def extract(directory):
    """Go over all images with images directory

    Args:
        directory (string): images directory location
    """
    images = []

    try:
        for (dirpath, dirnames, filenames) in walk(directory):
            if not filenames:
                continue
            for file in filenames:
                img = Image(dirpath, file)
                images.append(img)
    except:
        print('WTF')
        logging.exception(
            'Somthing went wrong while "walking" on directory {0}'.format(directory))

    if(images.__len__() < 1):
        return

    # This will utilized all cores, good for single machine / VM, it is not a distributed solution
    pool = Pool()
    pool.map(process_file, images)


def process_file(img):
    """process single image, extract features and emotions
        the process create the user model as well.
    Args:
        img (EmotionalImage): image data
    """
    assert isinstance(img, Image)
    if str(img.name).find('json') > -1:
        return

    user = get_user(os.path.join(img.path, 'meta.json'))
    filePath = os.path.join(img.path, img.name)
    # logging.info("---------------Processsing----------------", img.name)
    print("---------------Processsing----------------", img.name)

    try:
        features = extract_features(filePath)
    except:
        logging.exception('Somthing went wrong with feature extraction')
        return

    try:
        emotions = predict_emotions(features)
    except:
        logging.exception('Somthing went wrong with emotions extraction')
        return

    uuid1 = uuid.uuid4()
    emImage = EmotionalImage(
        uuid1, img.name, img.path, features, emotions, "", "", "")
    
    # TODO: fix that, currently add one image at a time, not a functional issue but can be imroved.
    user.images.append(emImage)
    user.save()


def parse_arguments():
    global CONSOLE_ARGUMENTS
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "pathToImgs", help="Path tot the images directory to be process", type=str)

    CONSOLE_ARGUMENTS = parser.parse_args()


CONSOLE_ARGUMENTS = None

if __name__ == "__main__":
    # logging.getLogger().setLevel("INFO")
    parse_arguments()
    extract(CONSOLE_ARGUMENTS.pathToImgs)
