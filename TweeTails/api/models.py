from django.db import models
class Animal():
    lng = models.DecimalField()
    lat = models.DecimalField()
    description = models.CharField(min_length=10, max_length=1000)
    species = models.CharField(max_length=1000)
    title = models.CharField(min_length=5, max_length=1000)
    images = models.JSONField(default=list)
    uName = models.CharField()
    uPhoto = models.CharField(default="")
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['lng', 'lat', 'description', 'species', 'title', 'images', 'uName' ]

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.title