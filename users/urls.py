from django.urls import path
from . import views

urlpatterns = [
    path('registerPage/', views.registerPage, name='register'),
    path('registerUser/', views.registerUser, name='registerUser'),
    path('loginPage/', views.loginPage, name='loginPage'),
    path('loginUser/', views.loginUser, name='loginUser'),
    path('logoutUser/', views.logoutUser, name='logoutUser'),
]