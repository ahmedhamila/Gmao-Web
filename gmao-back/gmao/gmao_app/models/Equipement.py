from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from datetime import datetime



class Equipement (models.Model):
    code = models.CharField(max_length=8, null=False, blank=True, help_text='code de equipement')
    date_fabrication = models.DateField(null=False, blank=True,default=datetime(2001,12,26), help_text='Date de fabrication de l equipement')
    date_mise_en_marche = models.DateField(null=False, blank=True,default=datetime(2001,12,26), help_text='date_mise_en_marche de l equipement')
    type = models.CharField(max_length=20, null=False, blank=True, help_text='type de equipement')

    
    
    class Meta :
        ordering = ['-code']
    def __str__(self):
       return self.id