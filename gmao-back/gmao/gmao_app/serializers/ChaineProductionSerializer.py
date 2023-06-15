from rest_framework import serializers
from ..models import ChaineProduction

class ChaineProductionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=ChaineProduction
        fields=["reference","nb_equipement"]
        depth = 1
    