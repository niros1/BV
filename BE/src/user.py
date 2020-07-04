import json
import db


class User:
    """
        User model & dto, hold metadata and set of images
        TODO: DTO should be extracted to a designated class
    """

    images = []

    def __init__(self, name, id, sex, age, country):
        self.name = name
        self.id = id
        self.sex = sex
        self.age = age
        self.country = country

    def __str__(self):
        ''' Defalt print'''
        return (self.name + ' ' + str(self.age) + ' ')

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=2)

    def save(self):
        ''' Store user and images in DB, doesn't support update.'''
        db.Pcursor().execute("CALL bv.addUser('{0}', '{1}', {2}, '{3}', '{4}')".format(
            self.id, self.name, self.age, self.sex, self.country))
        self.save_images()

    def save_images(self):
        ''' Store images in DB'''
        for image in self.images:
            image.save(self.id)
