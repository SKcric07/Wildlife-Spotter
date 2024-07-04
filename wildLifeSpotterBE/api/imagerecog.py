import torch
import torchvision.transforms as transforms
from PIL import Image
from torchvision import models
import requests
from database.views import add_or_update_sighting

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

def predict_image(request,file):
    img_tensor = preprocess_image(file)
    with torch.no_grad():
        out = model(img_tensor)
        confidence = torch.nn.functional.softmax(out, dim=1)[0] * 100
        top5_prob, top5_idx = torch.topk(confidence, 5)
        
        results = []
        for i in range(top5_prob.size(0)):
            label = labels[top5_idx[i]]
            probability = top5_prob[i].item()
            results.append((label, probability))

        message = "Identified"

        if results[0][1] > 60:
            if(request.user.is_authenticated):
                add_or_update_sighting(request.user.email, results[0][0])
        else:
            message = "UnIdentified"        
        return results,message
