from django.contrib import admin
from ..models import Magasinier


@admin.register(Magasinier)
class MagasinierAdmin(admin.ModelAdmin):

    list_display = ('first_name','last_name')
    list_filter = ('first_name',)