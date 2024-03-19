from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('animal/', include('animal.urls')),
    path('accounts/', include('accounts.urls')),
         #GetUserDetails.as_view(), name='user-details')
]

urlpatterns += [re_path(r'^.*', include('frontend.urls'))]
