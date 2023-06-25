# Generated by Django 4.1.2 on 2023-06-20 18:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gmao_app', '0005_bonapprovisionnement_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bonapprovisionnement',
            old_name='Description',
            new_name='description',
        ),
        migrations.AlterField(
            model_name='bontravail',
            name='date_liberation',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2023, 6, 20, 19, 27, 47, 754298), help_text='Date de liberation de l BonTravail', null=True),
        ),
    ]