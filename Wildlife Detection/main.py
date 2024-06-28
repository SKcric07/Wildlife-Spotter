import os
from flask import Flask, request, render_template, send_from_directory
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 7 * 1024 * 1024  # Max upload size is 7MB

# Load the trained model
model = load_model('animal_detector.h5')

# Load class indices
with open('class_indices.json', 'r') as f:
    class_indices = json.load(f)
class_labels = {v: k for k, v in class_indices.items()}

# Load animal details
with open('animal_details.json', 'r') as f:
    animal_details = json.load(f)

@app.route('/')
def upload_file():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def detect_animal():
    if 'my_image' not in request.files:
        return render_template('index.html', error='No file part')

    file = request.files['my_image']
    if file.filename == '':
        return render_template('index.html', error='No selected file')

    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Preprocess the image
        img = load_img(file_path, target_size=(150, 150))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Predict the class
        predictions = model.predict(img_array)
        predicted_class_idx = np.argmax(predictions[0])  # Get index of the highest probability
        predicted_class = class_labels[predicted_class_idx]  # Map index to class label

        # Get animal details
        details = animal_details.get(predicted_class, "No details available for this animal.")

        return render_template('index.html', prediction=predicted_class, details=details, img_path=file_path)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
