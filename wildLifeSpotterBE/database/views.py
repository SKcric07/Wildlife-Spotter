#from django.shortcuts import render --subject of removal
from .models import Sample
from json import loads
from django.core.serializers import serialize
# Create your views here.


def getUserData(request):
    uName = loads(request.body).get("username")
    userData = Sample.objects.filter(username = uName ).values('details').first()
    return userData