from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from datetime import datetime



class ResponsableChaineProduction (models.Model):
    first_name = models.CharField(max_length=20, help_text='Prenom de l ResponsableChaineProduction')
    last_name = models.CharField(max_length=30, null=False, blank=True, help_text='Nom de l ResponsableChaineProduction')
    date_of_birth = models.DateField(null=False, blank=True,default=datetime(2001,12,26), help_text='Date de naissance de l ResponsableChaineProduction')
    mail = models.EmailField(null=False, blank=True,default=None , help_text='Email de l ResponsableChaineProduction')
    phone_number = PhoneNumberField(null=False, blank=True,default=None , help_text='Numero de Telephone de l ResponsableChaineProduction')
    image = models.ImageField(blank=True,null=True,upload_to='images/ResponsableChaineProduction/')
    user=models.OneToOneField(User,on_delete=models.CASCADE,null=False,default=None)
    
    class Meta :
        ordering = ['-first_name']
    def __str__(self):
       return self.mail