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
    has_bon_travail = serializers.SerializerMethodField()

    def get_has_bon_travail(self, obj):
        try:
            return obj.bontravail is not None
        except DemandeIntervention.bontravail.RelatedObjectDoesNotExist:
            return False
    class Meta:
        model=DemandeIntervention
        fields=["id","responsable_chaine_production","responsable_maintenance","equipement","description","section","date_liberation","motif","status","has_bon_travail"]
        #depth = 1
    