from django.urls import path
from .views import AnimalCreate

urlpatterns = [
    path('create/', AnimalCreate.as_view(), name='animal-create'),
    path('get-all/', AnimalCreate.as_view(), name='get-all-animal')
]