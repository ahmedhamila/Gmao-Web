from django.contrib import admin
from ..models import ResponsableMaintenance


@admin.register(ResponsableMaintenance)
class ResponsableMaintenanceAdmin(admin.ModelAdmin):

    list_display = ('id','first_name','last_name')
    list_filter = ('first_name',)