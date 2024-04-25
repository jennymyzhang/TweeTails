from django.db import models

class Animal(models.Model):
    lng = models.DecimalField(decimal_places=20, max_digits=100)
    lat = models.DecimalField(decimal_places=20, max_digits=100)
    description = models.CharField(max_length=1000)
    species = models.CharField(max_length=1000, default="")
    title = models.CharField(max_length=1000, default="")
    images = models.JSONField(default=list)
    uid = models.IntegerField()
    first_name = models.CharField()
    last_name = models.CharField()
    uPhoto = models.CharField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['lng', 'lat', 'description', 'title', 'first_name', 'last_name' ]
    def __str__(self):
        return self.title