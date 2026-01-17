# api/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    # Auth SignUp and SignIn views
    path('user/signup/', UserSignUp.as_view(), name='user_signun'),
    path('user/signin/', UserSignIn.as_view(), name='user_signin'),
    
]