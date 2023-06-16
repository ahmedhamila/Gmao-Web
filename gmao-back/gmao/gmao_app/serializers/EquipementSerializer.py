from rest_framework import serializers
from ..models import Equipement

class EquipementSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Equipement
        fields=["id","code","date_fabrication","date_mise_en_marche","type"]
        depth = 1
    