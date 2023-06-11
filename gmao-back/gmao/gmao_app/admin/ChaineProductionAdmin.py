from django.contrib import admin
from ..models import ChaineProduction


@admin.register(ChaineProduction)
class ChaineProductionAdmin(admin.ModelAdmin):

    list_display = ('reference',)
    list_filter = ('reference',)