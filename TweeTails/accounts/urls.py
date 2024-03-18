
from django.urls import path

from .views import UpdateUserPhotoURL

urlpatterns = [
    path('user-profile-update/', UpdateUserPhotoURL.as_view(), name='update-photo'),
]
