from django.contrib import admin
from ..models import BonApprovisionnement


@admin.register(BonApprovisionnement)
class BonApprovisionnementAdmin(admin.ModelAdmin):

    list_display = ('description',)
    list_filter = ('description',)