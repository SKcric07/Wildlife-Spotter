import os
import random
import string
import traceback

from django.core.mail import send_mail
#from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import AuthenticationFailed
from .imagerecog import predict_image
from database import views as db_views
from .googleutils import get_random_image_file
from wildLifeSpotterBE.settings import EMAIL_HOST_USER


@api_view(['GET'])
@permission_classes([AllowAny])
def hello_world(request):
    message = {
        "message": "Hello World"
    }
    return Response(message)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user_data = db_views.get_user_data(request.user)
    return JsonResponse(user_data, safe=False)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    user_data = db_views.register_user(request.data)
    return Response(user_data)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):

    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        raise AuthenticationFailed('Email and password are required')

    user = db_views.authenticate_user(email, password)
    access_token, refresh_token = db_views.generate_tokens(user)

    response = Response()
    response.set_cookie(key='jwt', value=access_token, httponly=True, secure=True, samesite='Strict')
    response.set_cookie(key='refresh_token', value=refresh_token, httponly=True, secure=True, samesite='Strict')
    response.data = {
        "message": "Success",
        "user": db_views.get_user_data(user),
        "access_token": access_token
    }

    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token = request.COOKIES.get('refresh_token')

    if not refresh_token:
        raise AuthenticationFailed('Refresh token required')

    try:
        user = db_views.decode_token(refresh_token)  
        access_token, new_refresh_token = db_views.generate_tokens(user)  

        response = Response()
        
        response.set_cookie(
            key='jwt', 
            value=access_token, 
            httponly=True, 
            secure=True, 
            samesite='Strict'
        )

        response.set_cookie(
            key='refresh_token', 
            value=new_refresh_token, 
            httponly=True, 
            secure=True, 
            samesite='Strict'
        )
        
        response.data = {
            "message": "Success"
        }
        return response
    
    except Exception as e:
        raise AuthenticationFailed(f'Error refreshing token: {str(e)}')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        "message": "Logged out"
    }
    return response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_data(request):
    user = request.user
    data = request.data
    updated_user_data = db_views.update_user(user, data)
    return Response(updated_user_data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def partial_update_user_data(request):
    user = request.user
    data = request.data
    updated_user_data = db_views.partial_update_user(user, data)
    return Response(updated_user_data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_password(request):
    data = request.data
    user = request.user  
    return Response(db_views.change_password(user=user, data=data))

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    user = request.user
    db_views.delete_user(user)
    response = Response({"message": "User deleted successfully"})
    response.delete_cookie('jwt')
    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_image_view(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file part'}, status=400)

    file = request.FILES['file']
    if not file:
        return JsonResponse({'error': 'No selected file'}, status=400)

    try:
        result = predict_image(request, file)

        return JsonResponse(result)
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def getRewards(request):
    reward, total_animals_found, year = db_views.retrieve_original_document_and_animals_found(request.query_params.get('email'))
    
    if reward:
        response_data = {
            'reward': {
                'user': reward.user,
                'sightings': reward.sightings
            },
            'total_animals_found': total_animals_found,
            'year': int(year)
        }
    else:
        response_data = {
            'error': 'No rewards found for this user.'
        }

    return Response(response_data)    



@api_view(['GET'])
@permission_classes([AllowAny])
def get_random_image(request):
    """Get a random image file from Google Drive."""
    try:
        image_data, file_name = get_random_image_file()

        # Return the random image
        response = HttpResponse(image_data, content_type='image/jpeg')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'
        return response

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def generate_otp():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

def send_otp_email(email, otp):
    subject = 'Your OTP Code'
    message = f'Your OTP code is {otp}. It is valid for the next 10 minutes.'
    send_mail(subject, message, EMAIL_HOST_USER, [email])

@api_view(['POST'])
def request_otp(request):
    email = request.data.get('email')
    
    if not email:
        return Response({'detail': 'Email is required'}, status=400)
    
    user = db_views.get_user_by_email(email)  # Adjust according to your implementation
    if not user:
        return Response({'detail': 'User not found'}, status=404)
    
    otp = generate_otp()
    expiration_time = timezone.now() + timedelta(minutes=10)
    
    # Save OTP to database
    db_views.save_otp(user.id, otp, expiration_time)  # Adjust according to your implementation
    
    # Send OTP email
    send_otp_email(email, otp)
    
    return Response({'detail': 'OTP sent to your email'}, status=200)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    print("here")
    email = request.data.get('email')
    otp = request.data.get('otp')
    
    if not email or not otp:
        return Response({'detail': 'Email and OTP are required'}, status=400)
    
    user = db_views.get_user_by_email(email)
    if not user:
        return Response({'detail': 'User not found'}, status=404)
    
    valid_otp, token = db_views.get_valid_otp(user, otp)
    if valid_otp is None:
        return Response({'detail': 'Invalid or expired OTP'}, status=400)
    
    response = Response({'detail': 'OTP verified successfully','otp_token': token})
    response.set_cookie('otp_token', token, httponly=True, secure=False, samesite='lax')
    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def change_password_after_otp(request):
    token = request.data.get('otp_token')
    
    if not token:
        return Response({'detail': 'OTP verification required'}, status=403)
    
    payload = db_views.decode_token(token)
    if not payload:
        return Response({'detail': 'Invalid or expired OTP token'}, status=403)
    
    user = db_views.get_user_by_email(payload.email)
    
    new_password = request.data.get('new_password')
    if not new_password:
        return Response({'detail': 'New password is required'}, status=400)
    
    db_views.change_password(user,new_password)

    response = Response({'detail': 'Password changed successfully'})
    response.delete_cookie('otp_token')

    return response


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def get_random_local_species(request):
    print(request.data.get('count'))
    print(request.data)
    count = int(request.data.get('count'))
    species_records = db_views.get_random_local_species_records(count)
    return JsonResponse(species_records, safe=False)