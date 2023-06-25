from rest_framework import viewsets
from ..serializers import MagasinierSerializer
from ..models import Magasinier
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class MagasinierViewSet(viewsets.ModelViewSet):
    serializer_class=MagasinierSerializer
    queryset=Magasinier.objects.all()
    permission_classes = [AllowAny]



       