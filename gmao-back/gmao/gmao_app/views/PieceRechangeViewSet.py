from rest_framework import viewsets
from ..serializers import PieceRechangeSerializer
from ..models import PieceRechange
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class PieceRechangeViewSet(viewsets.ModelViewSet):
    serializer_class=PieceRechangeSerializer
    queryset=PieceRechange.objects.all()
    permission_classes = [AllowAny]