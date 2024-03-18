from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserCreateSerializer
import logging
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
authentication_classes = [JWTAuthentication]

class GetUserDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserCreateSerializer(request.user)
        return Response(serializer.data)

class UpdateUserPhotoURL(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        logging.debug(self)
        logging.debug(self)
        
        user = request.user 
        new_photo_url = request.data.get('photoURL')
        logging.debug(new_photo_url)
        logging.debug(user)

        if not new_photo_url:
            return JsonResponse({'error': 'No photo URL provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.photoURL = new_photo_url
        user.save()

        serializer = UserCreateSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)