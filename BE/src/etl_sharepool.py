
from multiprocessing import Pool, Value
from extract_features import extract_features
from predict_emotions import predict_emotions
from EmotionalImage import EmotionalImage
from user import User
import json
from os import walk
import sys
import uuid

"""Extract Transform Load 
    Extract: read all images from images directory
    Transform: cleaning, extract features and emotions, modeling the data into User & EmotionalImage
    Load: persist data to DB

"""


class Image:
    def __init__(self, path, name):
        self.path = path
        self.name = name


usersDict = {}


def initializer():
    global usersDict
    usersDict = {}


def get_user(filePath):
    """Construct User, read metadata.json from the user's directory

    Args:
        filePath (string): image file path

    Returns:
        [User]: user class
    """

    global usersDict
    userName = filePath.split('/')[1]
    # print(usersDict)

    if userName in usersDict:
        user = usersDict[userName]

    if not "user" in locals():
        with open(filePath) as json_file:
            data = json.load(json_file)
            user = User(data['name'], uuid.uuid4(),
                        data['sex'], data['age'], data['country'])
            user.images = []
        usersDict[userName] = user

    return user


def extract(directory):
    """Go over all images with images directory

    Args:
        directory (string): images directory location
    """
    global usersDict
    images = []

    for (dirpath, dirnames, filenames) in walk(directory):
        if not filenames:
            continue
        for file in filenames:
            img = Image(dirpath, file)
            images.append(img)
        # This will utilized all cores, good for single machine / VM, it is not a distributed solution
    pool = Pool(4, initializer, ())

    pool.map(model_processing, images)

    print('FINISHHH----', usersDict)
    for user in usersDict:
        print('DICTTT----', user.images)
        user.save()


def model_processing(img):
    """process single image, extract features and emotions
        the process create the user model as well.
    Args:
        img (EmotionalImage): image data
    """

    # assert isinstance(img, EmotionalImage)

    if str(img.name).find('json') > -1:
        return
    user = get_user(img.path + '/' + 'meta.json')
    filePath = img.path + '/' + img.name
    # print("---------------Processsing----------------", img.name)

    features = extract_features(filePath)
    emotions = predict_emotions(features)
    uuid1 = uuid.uuid4()
    emImage = EmotionalImage(
        uuid1, img.name, img.path, features, emotions, "", "", "")
    user.images.append(emImage)
    # user.save()
