from django.contrib import admin
from ..models import Equipement


@admin.register(Equipement)
class EquipementAdmin(admin.ModelAdmin):

    list_display = ('code',)
    list_filter = ('code',)