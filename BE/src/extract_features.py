import cv2
import numpy as np

def extract_features(rgb_img_or_filename,resize=[256,256]):
    '''
    Extract features from the given image ' rgb_img_or_filename' - which is either numpy array of RGB image or path to image file.
    Return a numpy array of extracted features (array of length 30)
    '''

    if isinstance(rgb_img_or_filename,str):
        img = cv2.imread(rgb_img_or_filename, 0)
    else:
        img = rgb_img_or_filename

    img = cv2.resize(img,tuple(resize))

    rist = cv2.calcHist(img, [0], None, [10], [0, 256])
    gist = cv2.calcHist(img, [1], None, [10], [0, 256])
    bist = cv2.calcHist(img, [2], None, [10], [0, 256])

    hist = np.concatenate([rist,gist,bist])

    return hist.transpose()

