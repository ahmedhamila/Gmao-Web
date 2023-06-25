from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from datetime import date
from .Equipement import Equipement
class DemandeIntervention (models.Model):
    responsable_maintenance=models.ForeignKey('gmao_users.ResponsableMaintenance',on_delete=models.CASCADE,null=False,default=None)
    responsable_chaine_production=models.ForeignKey('gmao_users.ResponsableChaineProduction',on_delete=models.CASCADE,null=False,default=None)
    equipement=models.ForeignKey(Equipement,on_delete=models.CASCADE,null=False,default=None)
    description = models.TextField( help_text='Description de l Demande')
    section = models.CharField(max_length=5, null=False, blank=True, help_text='section de l Demande')
    date_liberation = models.DateField(null=False, blank=True,default=date.today, help_text='Date de liberation de l Demande')
    class Motif(models.TextChoices):
        ARRETCOMPLET = 'AC', ('Arretcomplet')
        ANOMALIE = 'AN', ('Anomalie')
        
    motif = models.CharField(
        max_length=2,
        choices=Motif.choices,
        default=Motif.ARRETCOMPLET,help_text='motif du Demande')

    class Status(models.TextChoices):
        TRAITEE = 'TT', ('Traitee')
        ENCOURS = 'EC', ('Encours')
        NONTRAITEE = 'NT', ('Nontraitee')
        
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.NONTRAITEE,help_text='Status du Demande')

    
    class Meta :
        ordering = ['-date_liberation']
    def __str__(self):
       return str(self.id)