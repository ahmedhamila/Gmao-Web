from rest_framework import serializers
from ..models import PieceRechange

class PieceRechangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=PieceRechange
        fields='__all__'
    