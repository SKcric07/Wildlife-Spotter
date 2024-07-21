import datetime
from datetime import timedelta
import jwt

from django.contrib.auth.models import User as authUser

from django.utils import timezone
from django.db.models import Sum
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.exceptions import AuthenticationFailed, ValidationError
from wildLifeSpotterBE.serializers import UserSerializer
from wildLifeSpotterBE.settings import SECRET_KEY, WLS_JWT_ACCESS_TOKEN_LIFETIME, WLS_JWT_REFRESH_TOKEN_LIFETIME
from wildLifeSpotterBE.settings import SAME_SPECIES_BUFFER
from database.models import Rewards
from .models import User, ProfileDetails
from .models import OTP
from .models import Species, NotFoundLog


def get_user_data(user):
    if not user.is_authenticated:
        raise AuthenticationFailed('User is not authenticated')
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }

def register_user(data):
    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return serializer.data

def authenticate_user(email, password):
    user = User.objects.filter(email=email).first()

    if user is None:
        raise AuthenticationFailed('User not found')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect login details')

    return user

def generate_tokens(user):
    access_payload = {
        'id': user.id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=WLS_JWT_ACCESS_TOKEN_LIFETIME),
        'iat': datetime.datetime.now(datetime.timezone.utc)
    }

    refresh_payload = {
        'id': user.id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=WLS_JWT_REFRESH_TOKEN_LIFETIME),
        'iat': datetime.datetime.now(datetime.timezone.utc)
    }

    access_token = jwt.encode(access_payload, SECRET_KEY, algorithm='HS256')
    refresh_token = jwt.encode(refresh_payload, SECRET_KEY, algorithm='HS256')

    return access_token, refresh_token

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Refresh token expired')
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Invalid refresh token')

    user = User.objects.filter(id=payload['id']).first()
    if user is None:
        raise AuthenticationFailed('User not found')

    return user

def update_user(user, data):
    serializer = UserSerializer(user, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    # Update user details in MongoDB
    details_data = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    }
    ProfileDetails.objects.filter(username=user.email).update(details=details_data)

    return serializer.data

def partial_update_user(user, data):
    serializer = UserSerializer(user, data=data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    details_data = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    }
    ProfileDetails.objects.filter(username=user.email).update(details=details_data)

    return serializer.data

def change_password(user, data):
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if not old_password or not new_password:
        raise ValidationError('Old password and new password are required.')

    if not user.check_password(old_password):
        raise ValidationError('Incorrect old password.')

    user.set_password(new_password)
    user.save()

    return {
        "message": "Password Changed Successfully"
    }

def delete_user(user):
    ProfileDetails.objects.filter(username=user.email).delete()
    user.delete()


def add_or_update_sighting(user_email, animal_name):
    reward, created = Rewards.objects.get_or_create(user=user_email)
    current_time = timezone.now()
    period = current_time - timedelta(hours=SAME_SPECIES_BUFFER)

    if not reward.sightings:
        reward.sightings = {'total_count': 0, 'animals': {}}
    
    animals = reward.sightings.get('animals', {})

    if animal_name in animals:
        last_updated = animals[animal_name]['last_updated_timestamp']
        if last_updated < period.isoformat():
            animals[animal_name]['count'] += 1
            reward.sightings['total_count'] += 1
            animals[animal_name]['last_updated_timestamp'] = current_time.isoformat()
    else:
        animals[animal_name] = {
            'count': 1,
            'last_found_timestamp': current_time.isoformat(),
            'last_updated_timestamp': current_time.isoformat()  
        }
        reward.sightings['total_count'] += 1

    animals[animal_name]['last_found_timestamp'] = current_time.isoformat()
    reward.sightings['animals'] = animals
    reward.save()

def retrieve_original_document_and_animals_found(user_email):
    try:
        reward = Rewards.objects.filter(user=user_email).first()
        if reward:
            number_of_animals = len(reward.sightings['animals'])
            return reward, number_of_animals
        else:
            return None, 0 
    except ObjectDoesNotExist:
        return None, 0 



def save_otp(user_id, otp, expires_at):
    OTP.objects.create(user_id=user_id, otp=otp, expires_at=expires_at)

def get_valid_otp(user, otp):
    try:
        otp_entry = OTP.objects.filter(user_id=user.id, otp=otp).latest('created_at')
        if otp_entry.is_valid():
            payload = {
                'id': user.id,
                'email': user.email,
                'exp': timezone.now() + timedelta(minutes=15),
                'iat': datetime.datetime.now(datetime.timezone.utc)
                }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            return otp_entry,token
    except OTP.DoesNotExist:
        return None
    return None

def get_user_by_email(email):
    try:
        return User.objects.get(email=email)
    except ObjectDoesNotExist:
        return None

def change_password(user, new_password):
    try:
        user.set_password(new_password)
        user.save()
        delete_otps_for_user(user)
        return {"message": "Password changed successfully"}
    except Exception as e:
        raise ValidationError(f"Failed to change password: {str(e)}")

def delete_otps_for_user(user):
    OTP.objects.filter(user=user).delete()


def get_species_info(name):
    try:
        species = Species.objects.get(Q(name__iexact=name))
        return {
            'name': species.name,
            'details': species.details,
            'status': species.status
        }
    except Species.DoesNotExist:
        NotFoundLog.objects.create(name=name)
        
        return {
            'name': name,
            'details': 'Details coming soon',
            'status': 'Status coming soon'
        }