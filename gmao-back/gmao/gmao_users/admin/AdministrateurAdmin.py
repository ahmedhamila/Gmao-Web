from django.contrib import admin
from ..models import Administrateur


@admin.register(Administrateur)
class AdministrateurAdmin(admin.ModelAdmin):

    list_display = ('first_name','last_name')
    list_filter = ('first_name',)