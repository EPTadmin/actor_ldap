# Generated by Django 4.2.6 on 2023-12-01 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app_teaching", "0018_person_activities"),
    ]

    operations = [
        migrations.AlterField(
            model_name="personactivity",
            name="amount",
            field=models.FloatField(),
        ),
    ]