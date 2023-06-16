from rest_framework import viewsets
from ..serializers import AgentMaintenanceSerializer
from ..models import AgentMaintenance
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class AgentMaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class=AgentMaintenanceSerializer
    queryset=AgentMaintenance.objects.all()
    permission_classes = [AllowAny]



       