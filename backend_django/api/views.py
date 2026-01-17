from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .utils import generate_jwt
from django.contrib.auth import authenticate 
from django.contrib.auth.hashers import check_password

class UserSignUp(APIView):
    def post(self, request):
        data = request.data
        if not data:
            return Response({"error": "Could not find data in the request"},status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UsersSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            
            # generating token
            token = generate_jwt(user)
            
            return Response(
                {
                    "message": "User registered successfully",
                    "token": token,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                    },
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class UserSignIn(APIView):
    
    def post(self, request):
        username = request.data.get('username')
        password =  request.data.get('password')

        if not username or not password:
            return Response({"error": "Username or Password can't be null!!"},status=status.HTTP_400_BAD_REQUEST)
        
        user = Users.objects.get(username=username)
        if not user:
            return Response({"error": "Could not find User with this Usernane"},status=status.HTTP_404_NOT_FOUND)
        
        # now checking password
        check = check_password(password, user.password)
        if check:
            
            # generating token
            token = generate_jwt(user)
            if not token:
                return Response({"error": "Could not generate token"},status=status.HTTP_400_BAD_REQUEST)
            
            return Response({
                    "token": token,
                    "user_id": user.id,
                },status=status.HTTP_200_OK)
        
        return Response({"Incorrect Password with this Username!!"},status=status.HTTP_400_BAD_REQUEST)
        