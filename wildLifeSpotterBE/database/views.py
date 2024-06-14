import datetime
import jwt

from rest_framework.exceptions import AuthenticationFailed,ValidationError
from wildLifeSpotterBE.serializers import UserSerializer
from wildLifeSpotterBE.settings import SECRET_KEY, WLS_JWT_ACCESS_TOKEN_LIFETIME, WLS_JWT_REFRESH_TOKEN_LIFETIME
from database.models import User


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


def decode_refresh_token(refresh_token):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=['HS256'])
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
    return serializer.data


def partial_update_user(user, data):
    serializer = UserSerializer(user, data=data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return serializer.data

def change_password(user,data):
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if not old_password or not new_password:
        raise ValidationError('Old password and new password are required.')

    if not user.check_password(old_password):
        raise ValidationError('Incorrect old password.')

    user.set_password(new_password)
    user.save()

    return({
        "message": "Password Changed Successfully"
    })

def delete_user(user):
    user.delete()
