from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('animal/', include('animal.urls')),
         #GetUserDetails.as_view(), name='user-details')
]

urlpatterns += [re_path(r'^.*', include('frontend.urls'))]
