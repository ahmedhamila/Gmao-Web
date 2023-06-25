from django.contrib import admin
from ..models import BonApprovisionnement
from ..models import PieceRechange


class PieceRechangeInline(admin.TabularInline):
    model = PieceRechange.bon_approvisionnement.through


@admin.register(BonApprovisionnement)
class BonApprovisionnementAdmin(admin.ModelAdmin):

    list_display = ('description',)
    list_filter = ('description',)
    
    inlines = [PieceRechangeInline]