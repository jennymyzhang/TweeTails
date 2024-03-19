from django.urls import path
from .views import AnimalCreate

urlpatterns = [
    path('create/', AnimalCreate.as_view(), name='animal-create'),
]