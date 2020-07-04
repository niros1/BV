import uuid
import json
import db


class EmotionalImage:
    """
        Image model & dto, hold image data and metadata
        TODO: DTO should be extracted to a designated class
    """

    def __init__(self, id, name, path, features, emotions, age, sex, country):
        self.id = id
        self.name = name
        self.path = path
        self.features = features
        self.emotions = emotions
        self.age = age
        self.sex = sex
        self.country = country

    def __str__(self):
        return self.name + ' ' + self.path

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)

    
    def save(self, userId):
        '''TODO: save to db shold not be here, other class should be responsible for that'''
        db.Pcursor().execute("CALL bv.addImage('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')".format(
            self.id, userId,  self.name, self.path, self.features, self.emotions))
