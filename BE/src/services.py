from user import User
from EmotionalImage import EmotionalImage
import json
import db


def get_users():
    users = []

    dbUsers = db.Pcursor().fetchall(
        'select name, id, age, sex, country, creation_date, updated_at, is_deleted from bv.users;')

    for row in dbUsers:
        user = User(row[0], row[1], row[3], row[2], row[4])
        users.append(user)
    return users


def get_all_images():
    images = []

    dbImages = db.Pcursor().fetchall("""
                        SELECT  img.id, img.name, img.path, img.features, img.emotions, img.user_id, usr.age, usr.sex, usr.country
                        FROM bv.images img, bv.users usr
                        WHERE img.user_id=usr.id
                       """)
    for row in dbImages:
        emImage = EmotionalImage(
            row[0], row[1], row[2], row[3], row[4], row[6], row[7], row[8])
        images.append(emImage)

    return images
