from rest_framework import serializers
from ..models import PieceRechange

class PieceRechangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=PieceRechange
        fields=["code","date_fabrication","date_mise_en_marche","type"]
        depth = 1
    