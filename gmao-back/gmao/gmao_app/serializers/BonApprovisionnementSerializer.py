from rest_framework import serializers
from ..models import BonApprovisionnement
from .PieceRechangeSerializer import PieceRechangeSerializer

class BonApprovisionnementSerializer(serializers.ModelSerializer):
    pieces_rechange = PieceRechangeSerializer(many=True, read_only=True)
    responsable_maintenance = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='mail'
     )
    magasinier = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='mail'
     )
    class Meta:
        model = BonApprovisionnement
        fields = ['id','responsable_maintenance', 'magasinier', 'date_liberation', 'description', 'pieces_rechange']
        read_only_fields = ('pieces_rechange', )
        extra_kwargs = {
            'pieces_rechange': {'read_only': True},
        }