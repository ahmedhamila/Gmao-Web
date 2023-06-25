from django.db import models
from datetime import date
class BonApprovisionnement (models.Model):
    
    responsable_maintenance = models.ForeignKey('gmao_users.ResponsableMaintenance',on_delete=models.CASCADE,null=False,default=None)
    magasinier = models.ForeignKey('gmao_users.Magasinier',on_delete=models.CASCADE,null=False,default=None)
    date_liberation = models.DateField(null=False, blank=True,default=date.today, help_text='date_liberation de l Bon Approvisionnement')
    description = models.TextField(max_length=500, null=False, blank=True, help_text='description de BonApprovisionnement')

    
    
    class Meta :
        ordering = ['-date_liberation']
    def __str__(self):
       return str(self.id)