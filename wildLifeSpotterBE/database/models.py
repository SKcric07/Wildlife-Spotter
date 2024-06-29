from django.db import models
from django.contrib.auth.models import AbstractUser
from djongo import models as mongo_models

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254,unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class UserDetails(mongo_models.Model):
    first_name = mongo_models.CharField(max_length=255)
    last_name = mongo_models.CharField(max_length=255)
    email = mongo_models.EmailField(max_length=254)

    class Meta:
        abstract = True

class ProfileDetails(mongo_models.Model):
    username = mongo_models.CharField(max_length=255)
    details = mongo_models.EmbeddedField(
        model_container=UserDetails
    )
    
    objects = mongo_models.DjongoManager()

    def __str__(self):
        return str(self.username)



