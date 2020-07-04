import numpy as np


def predict_emotions(features):
    '''
    Given features of image (extracted using extract_features()), predicts the emotional response.
    Return a numpy array with emotional response to 5 emotions: Fear, Disgust, Joy, Boredom, Calmed
    For instance: <0.3, 0.2, 0.7, 0, 0.5>
    '''

    # predict the features and return vector
    weighted_hist = np.multiply(features, range(features.size))
    np.random.seed(int(np.round(np.mean(weighted_hist))))

    return np.random.randint(100, size=(6))/100
