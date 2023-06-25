from django.db import models
from datetime import datetime
from .BonApprovisionnement import BonApprovisionnement


class PieceRechange (models.Model):
    bon_approvisionnement = models.ManyToManyField(BonApprovisionnement,default=None, related_name='pieces_rechange')

    code = models.CharField(max_length=8, null=False, blank=True, help_text='code de PieceRechange')
    nom = models.CharField(max_length=125, null=False, blank=True, help_text='nom de PieceRechange')

    
    
    class Meta :
        ordering = ['-code']
    def __str__(self):
       return str(self.id)