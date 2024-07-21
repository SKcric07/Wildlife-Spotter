from django.db import models
from django.contrib.auth.models import AbstractUser
from djongo import models as mongo_models
from django.utils.timezone import now, timedelta


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254, unique=True)
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

class Rewards(mongo_models.Model):
    user = mongo_models.CharField(max_length=255)
    sightings = mongo_models.JSONField(default=dict)

    objects = mongo_models.DjongoManager()

    def __str__(self):
        return str(self.user)
    

class OTP(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        return self.expires_at > now()
    
class Species(models.Model):
    name = models.CharField(max_length=255, unique=True)
    details = models.TextField(max_length=500*5)  
    status = models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)
    
class NotFoundLog(models.Model):
    name = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)    
 
