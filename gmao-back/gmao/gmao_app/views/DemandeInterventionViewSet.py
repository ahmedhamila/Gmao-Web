from rest_framework import viewsets
from ..serializers import DemandeInterventionSerializer
from ..models import DemandeIntervention
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class DemandeInterventionViewSet(viewsets.ModelViewSet):
    serializer_class=DemandeInterventionSerializer
    queryset=DemandeIntervention.objects.all()
    permission_classes = [AllowAny]