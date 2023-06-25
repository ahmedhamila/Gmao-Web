from rest_framework import viewsets
from ..serializers import ResponsableMaintenanceSerializer
from ..models import ResponsableMaintenance
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class ResponsableMaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class=ResponsableMaintenanceSerializer
    queryset=ResponsableMaintenance.objects.all()
    permission_classes = [AllowAny]



       