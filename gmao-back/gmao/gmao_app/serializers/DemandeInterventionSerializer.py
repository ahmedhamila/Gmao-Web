from rest_framework import serializers
from ..models import DemandeIntervention

class DemandeInterventionSerializer(serializers.ModelSerializer):
    responsable_maintenance = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='mail'
     )
    responsable_chaine_production = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='mail'
     )
    
    class Meta:
        model=DemandeIntervention
        fields=["id","responsable_chaine_production","responsable_maintenance","equipement","description","section","date_liberation","motif","status"]
        #depth = 1
    