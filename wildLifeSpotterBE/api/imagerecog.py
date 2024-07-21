import torch
import torchvision.transforms as transforms
from PIL import Image
from torchvision import models
import requests
from database.views import add_or_update_sighting, get_species_info
from .googleutils import upload_file_to_drive
from .imagerecog2 import detect_animal

model = models.inception_v3(pretrained=True)
model.eval()

# Load the ImageNet class labels
with open('labels.txt', 'r') as f:
    labels = [line.strip() for line in f.readlines()]

def preprocess_image(file):
    image = Image.open(file)
    preprocess = transforms.Compose([
        transforms.Resize(299),  # InceptionV3 expects input size of 299x299
        transforms.CenterCrop(299),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    img_t = preprocess(image)
    return torch.unsqueeze(img_t, 0)

def predict_image(request, file):
    img_tensor = preprocess_image(file)

    with torch.no_grad():
        out = model(img_tensor)
        confidence = torch.nn.functional.softmax(out, dim=1)[0] * 100
        top_prob, top_idx = torch.max(confidence, 0)

        label = labels[top_idx]
        probability = top_prob.item()

        custom_prediction, custom_confidence = detect_animal(file)

      #  print("label",label)
       # print("probability",probability)
        
       # print("custom_prediction",custom_prediction)
       # print("custom_confidence",custom_confidence)

        if custom_confidence>99.9:
            label=custom_prediction
            probability=custom_confidence    

        upload_file_to_drive(file)
        if request.user.is_authenticated:
            add_or_update_sighting(request.user.email, label)
        return get_species_info(label)

'''
        message = "Identified" if probability > 60 else "UnIdentified"

        if message == "Identified" and request.user.is_authenticated:
            add_or_update_sighting(request.user.email, label)'''
        
        
