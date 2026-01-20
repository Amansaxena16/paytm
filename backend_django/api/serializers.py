from rest_framework import serializers
from .models import Users
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [
            "username",
            "first_name",
            "last_name",
            "password",
            "created_at",
            ]
        extra_kwargs = {
            "password": {"write_only": True, "required": True} # ensures password is not sent in API responses.
        }
    def update(sef, instance, validated_data):
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        if password:
            instance.password = make_password(password)

        instance.save()
        return instance
    
    def validate(self, data):
        # Only enforce all fields for CREATE
        if self.instance is None:
            if not all([
                data.get("username"),
                data.get("first_name"),
                data.get("last_name"),
                data.get("password"),
            ]):
                raise serializers.ValidationError("All fields are required.")

        return data
    

    def validate_username(self, value):
        if Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def validate_password(self, value):
        if len(value) < 8:
            return  serializers.ValidationError("Password is too short")
        return value

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)