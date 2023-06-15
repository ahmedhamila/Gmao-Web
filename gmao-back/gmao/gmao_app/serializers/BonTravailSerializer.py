from rest_framework import serializers
from ..models import BonTravail

class BonTravailSerializer(serializers.ModelSerializer):
    responsable_maintenance = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='mail'
     )
    agent_maintenance = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='mail'
     )
    
    class Meta:
        model=BonTravail
        fields=["id","responsable_maintenance","agent_maintenance","equipement","refDIM","description","section","date_liberation","type","frequence","active","status"]
        #depth = 1
    