from rest_framework import serializers
from .models import Animal

class AnimalSerializer(serializers.ModelSerializer): #serializers are for To handle incoming JSON data and convert it to Django model instances, you'll need a serializer. If you're using Django REST Framework (DRF), define a serializer in a serializers.py file within your app:
    class Meta:
        model = Animal
        fields = '__all__'  # Or list the specific fields you want to include