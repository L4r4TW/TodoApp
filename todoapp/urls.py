from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('create-todo/', views.create_todo, name='create_todo'),
    path('delete-todo/', views.delete_todo, name='delete_todo'),
    path('get-todos/', views.get_todos, name='get_todos'),
    path('complete-todo/', views.complete_todo, name='complete_todo'),
]