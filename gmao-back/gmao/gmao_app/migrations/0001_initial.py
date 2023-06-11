# Generated by Django 4.1.2 on 2023-06-11 13:07

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gmao_users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChaineProduction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference', models.CharField(blank=True, help_text='reference de chaine', max_length=8)),
                ('nb_equipement', models.IntegerField(blank=True, default=0, help_text='nombre de l equipement')),
            ],
            options={
                'ordering': ['-reference'],
            },
        ),
        migrations.CreateModel(
            name='Equipement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, help_text='code de equipement', max_length=8)),
                ('date_fabrication', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='Date de fabrication de l equipement')),
                ('date_mise_en_marche', models.DateField(blank=True, default=datetime.datetime(2001, 12, 26, 0, 0), help_text='date_mise_en_marche de l equipement')),
                ('type', models.CharField(blank=True, help_text='type de equipement', max_length=20)),
            ],
            options={
                'ordering': ['-code'],
            },
        ),
        migrations.CreateModel(
            name='DemandeIntervention',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(help_text='Description de l Demande')),
                ('section', models.CharField(blank=True, help_text='section de l Demande', max_length=5)),
                ('date_liberation', models.DateField(blank=True, default=datetime.datetime(2023, 6, 11, 14, 7, 58, 479974), help_text='Date de liberation de l Demande')),
                ('motif', models.CharField(choices=[('AC', 'Arretcomplet'), ('AN', 'Anomalie')], default='AC', help_text='motif du Demande', max_length=2)),
                ('status', models.CharField(choices=[('TT', 'Traitee'), ('EC', 'Encours'), ('NT', 'Nontraitee')], default='NT', help_text='Status du Demande', max_length=2)),
                ('equipement', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_app.equipement')),
                ('responsable_chaine_production', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_users.responsablechaineproduction')),
                ('responsable_maintenance', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_users.responsablemaintenance')),
            ],
            options={
                'ordering': ['-date_liberation'],
            },
        ),
        migrations.CreateModel(
            name='BonTravail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(help_text='Description de l BonTravail')),
                ('section', models.CharField(blank=True, help_text='section de l BonTravail', max_length=5)),
                ('date_liberation', models.DateField(blank=True, default=datetime.datetime(2023, 6, 11, 14, 7, 58, 480974), help_text='Date de liberation de l BonTravail')),
                ('type', models.CharField(choices=[('CO', 'Correctif'), ('PR', 'Preventif')], default='CO', help_text='Type du bon', max_length=2)),
                ('frequence', models.IntegerField(blank=True, default=0, help_text='frequence de l BonTravail')),
                ('active', models.BooleanField(default=False)),
                ('status', models.CharField(choices=[('TT', 'Traitee'), ('EC', 'Encours'), ('NT', 'Nontraitee')], default='NT', help_text='Status du bon', max_length=2)),
                ('agent_maintenance', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_users.agentmaintenance')),
                ('equipement', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_app.equipement')),
                ('refDIM', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_app.demandeintervention')),
                ('responsable_maintenance', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='gmao_users.responsablemaintenance')),
            ],
            options={
                'ordering': ['-date_liberation'],
            },
        ),
    ]
