from django.urls import path
from . import views

urlpatterns = [
    path('hello/',views.hello_world, name='helloworld'),
    path('getuserdata',views.get_user_data, name='getuserdata'),
    path('register',views.register_user, name='registerUser'),
    path('login',views.login_user, name='loginUser'),
    path('logout',views.logout_user, name='logoutUser'),
    path('refreshaccesstoken',views.refresh_access_token, name='refreshAccessToken'),
    path('updateuserdata',views.update_user_data, name='updateuserdata'),
    path('partialupdateuser',views.partial_update_user_data,name='partialupdateuser'),
    path('delete-user',views.delete_user,name="deleteUser"),
    path('predict',views.predict_image_view,name='predictImage'),
    path('getrewards',views.getRewards, name='getRewards'),
    path('randomimage',views.get_random_image,name="getRandomImage"),
    path('generate-otp',views.request_otp, name='generate-otp'),
    path('verify-otp', views.verify_otp, name='verify-otp'),
    path('changepasswordotp', views.change_password_after_otp,name="changePasswordOnOTP"),
    path('getlocalspecies',views.get_random_local_species,name="randomLocalSpecies")

]