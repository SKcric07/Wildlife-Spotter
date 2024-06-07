from django.shortcuts import render 
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view

from database import views

# Create your views here.

@api_view(['GET'])
def helloWorld(request):
    message = {
        "Message" : "Hello World"
    }
    return Response(message)


@api_view(['POST'])
def getUserData(request):
    userData = views.getUserData(request)
    return JsonResponse(userData, safe=False)