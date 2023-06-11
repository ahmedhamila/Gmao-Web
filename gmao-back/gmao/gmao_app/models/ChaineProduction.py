from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from datetime import datetime



class ChaineProduction (models.Model):
    reference = models.CharField(max_length=8, null=False, blank=True, help_text='reference de chaine')
    nb_equipement = models.IntegerField(null=False, blank=True,default=0, help_text='nombre de l equipement')
    
    
    class Meta :
        ordering = ['-reference']
    def __str__(self):
       return self.id