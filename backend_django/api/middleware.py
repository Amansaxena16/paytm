from django.http import JsonResponse
from django.conf import settings
import jwt

class BearerTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        PUBLIC_PATHS = ["/user/signin/", "/user/signup/"]
        
        # Skip auth for admin & public endpoints
        if request.path in PUBLIC_PATHS or request.path.startswith("/admin/"):
            return self.get_response(request)

        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse(
                {"detail": "Authorization header missing"},
                status=401
            )

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(
                token,
                settings.JWT_SECRET_KEY,
                algorithms=["HS256"]
            )
        except jwt.ExpiredSignatureError:
            return JsonResponse({"detail": "Token expired"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"detail": "Invalid token"}, status=401)

        # Attach user_id to request
        request.user_id = payload.get("user_id")

        if not request.user_id:
            return JsonResponse(
                {"detail": "Invalid token payload"},
                status=401
            )

        return self.get_response(request)
