# Generated by Django 4.1.2 on 2023-06-20 18:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gmao_app', '0006_rename_description_bonapprovisionnement_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bonapprovisionnement',
            name='description',
            field=models.TextField(blank=True, help_text='description de BonApprovisionnement', max_length=500),
        ),
        migrations.AlterField(
            model_name='bontravail',
            name='date_liberation',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2023, 6, 20, 19, 36, 2, 129865), help_text='Date de liberation de l BonTravail', null=True),
        ),
    ]
