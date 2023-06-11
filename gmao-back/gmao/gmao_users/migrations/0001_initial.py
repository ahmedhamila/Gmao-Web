# Generated by Django 4.1.2 on 2023-06-11 13:05

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ResponsableProduction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(help_text='Prenom de l ResponsableProduction', max_length=20)),
                ('last_name', models.CharField(blank=True, help_text='Nom de l ResponsableProduction', max_length=30)),
                ('date_of_birth', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de naissance de l ResponsableProduction')),
                ('mail', models.EmailField(blank=True, default=None, help_text='Email de l ResponsableProduction', max_length=254)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Numero de Telephone de l ResponsableProduction', max_length=128, region=None)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/ResponsableProduction/')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-first_name'],
            },
        ),
        migrations.CreateModel(
            name='ResponsableMaintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(help_text='Prenom de l ResponsableMaintenance', max_length=20)),
                ('last_name', models.CharField(blank=True, help_text='Nom de l ResponsableMaintenance', max_length=30)),
                ('date_of_birth', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de naissance de l ResponsableMaintenance')),
                ('mail', models.EmailField(blank=True, default=None, help_text='Email de l ResponsableMaintenance', max_length=254)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Numero de Telephone de l ResponsableMaintenance', max_length=128, region=None)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/ResponsableMaintenance/')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-first_name'],
            },
        ),
        migrations.CreateModel(
            name='ResponsableChaineProduction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(help_text='Prenom de l ResponsableChaineProduction', max_length=20)),
                ('last_name', models.CharField(blank=True, help_text='Nom de l ResponsableChaineProduction', max_length=30)),
                ('date_of_birth', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de naissance de l ResponsableChaineProduction')),
                ('mail', models.EmailField(blank=True, default=None, help_text='Email de l ResponsableChaineProduction', max_length=254)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Numero de Telephone de l ResponsableChaineProduction', max_length=128, region=None)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/ResponsableChaineProduction/')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-first_name'],
            },
        ),
        migrations.CreateModel(
            name='Magasinier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(help_text='Prenom de l Magasinier', max_length=20)),
                ('last_name', models.CharField(blank=True, help_text='Nom de l Magasinier', max_length=30)),
                ('date_of_birth', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de naissance de l Magasinier')),
                ('mail', models.EmailField(blank=True, default=None, help_text='Email de l Magasinier', max_length=254)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Numero de Telephone de l Magasinier', max_length=128, region=None)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/Magasinier/')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-first_name'],
            },
        ),
        migrations.CreateModel(
            name='AgentMaintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(help_text='Prenom de l AgentMaintenance', max_length=20)),
                ('last_name', models.CharField(blank=True, help_text='Nom de l AgentMaintenance', max_length=30)),
                ('date_of_birth', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de naissance de l AgentMaintenance')),
                ('mail', models.EmailField(blank=True, default=None, help_text='Email de l AgentMaintenance', max_length=254)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Numero de Telephone de l AgentMaintenance', max_length=128, region=None)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/AgentMaintenance/')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-first_name'],
            },
        ),
        migrations.CreateModel(
            name='Administrateur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(help_text='Prenom de l Administrateur', max_length=20)),
                ('last_name', models.CharField(blank=True, help_text='Nom de l Administrateur', max_length=30)),
                ('date_of_birth', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de naissance de l Administrateur')),
                ('mail', models.EmailField(blank=True, default=None, help_text='Email de l Administrateur', max_length=254)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Numero de Telephone de l Administrateur', max_length=128, region=None)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/Administrateur/')),
                ('user', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-first_name'],
            },
        ),
    ]
