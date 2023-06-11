from django.contrib import admin
from ..models import BonTravail


@admin.register(BonTravail)
class BonTravailAdmin(admin.ModelAdmin):

    list_display = ('description',)
    list_filter = ('description',)