# Generated by Django 4.1.2 on 2023-02-28 19:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("todoapp", "0003_remove_todo_owner_todo_uuser"),
    ]

    operations = [
        migrations.RenameField(
            model_name="todo",
            old_name="uuser",
            new_name="user",
        ),
    ]
