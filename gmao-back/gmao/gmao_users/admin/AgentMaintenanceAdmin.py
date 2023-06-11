from django.contrib import admin
from ..models import AgentMaintenance


@admin.register(AgentMaintenance)
class AgentMaintenanceAdmin(admin.ModelAdmin):

    list_display = ('first_name','last_name')
    list_filter = ('first_name',)