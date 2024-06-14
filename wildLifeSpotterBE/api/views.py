from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import AuthenticationFailed

from database import views as db_views

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
    response.data = {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "message": "Success"
    }
    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_access_token(request):
    refresh_token = request.data.get('refresh_token')

    if not refresh_token:
        raise AuthenticationFailed('Refresh token required')

    user = db_views.decode_refresh_token(refresh_token)
    access_token, _ = db_views.generate_tokens(user)

    response = Response()
    response.set_cookie(key='jwt', value=access_token, httponly=True, secure=True, samesite='Strict')
    response.data = {
        "access_token": access_token
    }
    return response


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
    return Response(db_views.change_password(user=user,data=data))

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    user = request.user
    db_views.delete_user(user)
    response = Response({"message": "User deleted successfully"})
    response.delete_cookie('jwt')
    return response



