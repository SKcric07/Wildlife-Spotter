from django.urls import path
from . import views

urlpatterns = [
    path('hello/',views.helloWorld, name='helloworld'),
    path('getuserdata',views.getUserData, name='getuserdata')
]