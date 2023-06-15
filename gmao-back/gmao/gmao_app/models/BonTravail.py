from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from datetime import datetime

from .Equipement import Equipement
from .DemandeIntervention import DemandeIntervention

class BonTravail (models.Model):
    responsable_maintenance=models.ForeignKey('gmao_users.ResponsableMaintenance',on_delete=models.CASCADE,null=False,default=None)
    agent_maintenance=models.ForeignKey('gmao_users.AgentMaintenance',on_delete=models.CASCADE,null=False,default=None)
    
    equipement=models.ForeignKey(Equipement,on_delete=models.CASCADE,null=False,default=None)
    refDIM=models.OneToOneField(DemandeIntervention,on_delete=models.CASCADE,null=False,default=None)
    description = models.TextField( help_text='Description de l BonTravail')
    section = models.CharField(max_length=5, null=False, blank=True, help_text='section de l BonTravail')
    date_liberation = models.DateField(null=False, blank=True,default=datetime.now(), help_text='Date de liberation de l BonTravail')
    class TypeBon(models.TextChoices):
        CORRECTIF = 'CO', ('Correctif')
        PREVENTIF = 'PR', ('Preventif')
        
    type = models.CharField(
        max_length=2,
        choices=TypeBon.choices,
        default=TypeBon.CORRECTIF,help_text='Type du bon')

    frequence = models.IntegerField(null=False, blank=True,default=0 , help_text='frequence de l BonTravail')
    active = models.BooleanField(default=False)

    class StatusBon(models.TextChoices):
        TRAITEE = 'TT', ('Traitee')
        ENCOURS = 'EC', ('Encours')
        NONTRAITEE = 'NT', ('Nontraitee')
        
    status = models.CharField(
        max_length=2,
        choices=StatusBon.choices,
        default=StatusBon.NONTRAITEE,help_text='Status du bon')

    
    class Meta :
        ordering = ['-date_liberation']
    def __str__(self):
       return str(self.id)