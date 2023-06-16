from rest_framework import viewsets
from ..serializers import EquipementSerializer
from ..models import Equipement
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class EquipementViewSet(viewsets.ModelViewSet):
    serializer_class=EquipementSerializer
    queryset=Equipement.objects.all()
    permission_classes = [AllowAny]