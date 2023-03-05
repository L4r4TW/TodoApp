# Generated by Django 4.1.2 on 2023-02-28 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("todoapp", "0002_todo_owner"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="todo",
            name="owner",
        ),
        migrations.AddField(
            model_name="todo",
            name="uuser",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]