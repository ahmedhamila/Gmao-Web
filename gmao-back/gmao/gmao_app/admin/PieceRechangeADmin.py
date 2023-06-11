from django.contrib import admin
from ..models import PieceRechange


@admin.register(PieceRechange)
class PieceRechangeAdmin(admin.ModelAdmin):

    list_display = ('code',)
    list_filter = ('code',)