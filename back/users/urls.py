# from django.contrib import admin
from django.urls import path, include
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/google/', views.GoogleLogin.as_view(), name='google_login')
]
