from django.contrib import admin
from ..models import DemandeIntervention


@admin.register(DemandeIntervention)
class DemandeInterventionAdmin(admin.ModelAdmin):

    list_display = ('description',)
    list_filter = ('description',)