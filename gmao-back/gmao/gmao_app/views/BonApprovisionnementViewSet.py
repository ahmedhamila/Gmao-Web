from rest_framework import viewsets
from ..serializers import BonApprovisionnementSerializer
from ..models import BonApprovisionnement
from ..models import PieceRechange
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from gmao_users.models import AgentMaintenance
from gmao_users.models import ResponsableMaintenance
from gmao_users.models import Administrateur
from gmao_users.models import Magasinier
from gmao_users.models import ResponsableChaineProduction
from gmao_users.models import ResponsableProduction
from rest_framework.response import Response
class BonApprovisionnementViewSet(viewsets.ModelViewSet):
    serializer_class=BonApprovisionnementSerializer
    queryset=BonApprovisionnement.objects.all()
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        responsable_maintenance_id = self.request.data.get('responsable_maintenance')
        magasinier_id = self.request.data.get('magasinier')

        pieces = self.request.data.get('piece_rechanges')
        
        # Retrieve the related objects
        responsable_maintenance = ResponsableMaintenance.objects.get(id=responsable_maintenance_id)
        magasinier = Magasinier.objects.get(id=magasinier_id)
        
        # Assign the related objects to the serializer data
        serializer.validated_data['responsable_maintenance'] = responsable_maintenance
        serializer.validated_data['magasinier'] = magasinier

        # Save the BonApprovisionnement instance
        bon_approvisionnement = serializer.save()
        
        # Add pieces to the BonApprovisionnement instance
        for piece_id in pieces:
            piece = PieceRechange.objects.get(id=piece_id)
            bon_approvisionnement.pieces_rechange.add(piece)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        responsable_maintenance_id = self.request.data.get('responsable_maintenance')
        magasinier_id = self.request.data.get('magasinier')

        # Retrieve the related objects
        responsable_maintenance = ResponsableMaintenance.objects.get(id=responsable_maintenance_id)
        magasinier = Magasinier.objects.get(id=magasinier_id)

        # Assign the related objects to the serializer data
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['responsable_maintenance'] = responsable_maintenance
        serializer.validated_data['magasinier'] = magasinier

        # Save the updated BonApprovisionnement instance
        self.perform_update(serializer)

        return Response(serializer.data)
    def list(self, request, *args, **kwargs):
        user = request.user
        print(user)
        if user.is_authenticated:
            userType=''
            isAdministrateur = Administrateur.objects.filter(mail=user)
            isMagasinier = Magasinier.objects.filter(mail=user)
            isResponsableChaineProduction = ResponsableChaineProduction.objects.filter(mail=user)
            isResponsableMaintenance = ResponsableMaintenance.objects.filter(mail=user)
            isResponsableProduction = ResponsableProduction.objects.filter(mail=user)
            if isAdministrateur :
                userType='Administrateur'
                self.queryset = BonApprovisionnement.objects.all()
            
            elif isResponsableChaineProduction :
                userType='ResponsableChaineProduction'
                self.queryset = BonApprovisionnement.objects.all()
            elif isResponsableMaintenance :
                userType='ResponsableMaintenance'
                self.queryset = BonApprovisionnement.objects.filter(responsable_maintenance=isResponsableMaintenance.values()[0]['id'])
            elif isResponsableProduction :
                userType='ResponsableProduction'
                self.queryset = BonApprovisionnement.objects.all()
            elif isMagasinier :
                userType='Magasinier'
                self.queryset = BonApprovisionnement.objects.all(magasinier=isMagasinier.values()[0]['id'])

        return super().list(request, *args, **kwargs)