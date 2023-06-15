from rest_framework import viewsets
from ..serializers import BonTravailSerializer
from ..models import BonTravail
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class BonTravailViewSet(viewsets.ModelViewSet):
    serializer_class=BonTravailSerializer
    queryset=BonTravail.objects.all()
    permission_classes = [AllowAny]