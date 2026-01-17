from django.utils import timezone 
import jwt
from django.conf import settings
from datetime import timedelta

def generate_jwt(user):
        now = timezone.now()
        payload = {
            "user_id": str(user.id),
            "username": user.username,
            "iat": now,
            "exp": now + timedelta(hours=24),
        }

        print(settings.JWT_SECRET_KEY)
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")
        return token