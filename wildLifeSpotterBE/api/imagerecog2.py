from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import json
from PIL import Image

model = load_model('./animal_detector.h5')

# Load class indices
with open('class_indices.json', 'r') as f:
    class_indices = json.load(f)
class_labels = {v: k for k, v in class_indices.items()}


def detect_animal(file):
    # Open the image file
    img = Image.open(file)
    img = img.resize((150, 150))  # Resize the image to the target size

    # Convert the image to a numpy array and preprocess it
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0


    predictions = model.predict(img_array)
    confidence = predictions[0] * 100

    predicted_class_idx = np.argmax(confidence)

    predicted_class = class_labels[predicted_class_idx]

    confidence_score = confidence[predicted_class_idx]

    return predicted_class, confidence_score
