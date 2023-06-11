from django.contrib import admin
from ..models import ResponsableChaineProduction


@admin.register(ResponsableChaineProduction)
class ResponsableChaineProductionAdmin(admin.ModelAdmin):

    list_display = ('first_name','last_name')
    list_filter = ('first_name',)