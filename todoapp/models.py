from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# class TodoList(models.Model):
#     title = models.CharField(max_length=100)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.title

class Todo(models.Model):
    user = models.ForeignKey(User, null = True, blank = True, on_delete = models.CASCADE)
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name