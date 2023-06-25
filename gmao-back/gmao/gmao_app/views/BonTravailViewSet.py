from rest_framework import viewsets
from ..serializers import BonTravailSerializer
from ..models import BonTravail
from gmao_users.models import AgentMaintenance
from gmao_users.models import ResponsableMaintenance
from gmao_users.models import Administrateur
from gmao_users.models import Magasinier
from gmao_users.models import ResponsableChaineProduction
from gmao_users.models import ResponsableProduction
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

class BonTravailViewSet(viewsets.ModelViewSet):
    serializer_class=BonTravailSerializer
    queryset=BonTravail.objects.all()
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]


    def perform_create(self, serializer):
        agent_maintenance_id = self.request.data.get('agent_maintenance')
        responsable_maintenance_id = self.request.data.get('responsable_maintenance')
        
        # Retrieve the related objects
        agent_maintenance = AgentMaintenance.objects.get(id=agent_maintenance_id)
        responsable_maintenance = ResponsableMaintenance.objects.get(id=responsable_maintenance_id)
        
        # Assign the related objects to the serializer data
        serializer.validated_data['agent_maintenance'] = agent_maintenance
        serializer.validated_data['responsable_maintenance'] = responsable_maintenance

        # Save the BonTravail instance
        serializer.save()
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        agent_maintenance_id = request.data.get('agent_maintenance')
        responsable_maintenance_id = request.data.get('responsable_maintenance')

        # Retrieve the related objects
        agent_maintenance = AgentMaintenance.objects.get(id=agent_maintenance_id)
        responsable_maintenance = ResponsableMaintenance.objects.get(id=responsable_maintenance_id)

        # Assign the related objects to the serializer data
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['agent_maintenance'] = agent_maintenance
        serializer.validated_data['responsable_maintenance'] = responsable_maintenance

        # Save the updated BonTravail instance
        self.perform_update(serializer)

        return Response(serializer.data)
    def list(self, request, *args, **kwargs):
        user = request.user
        print(user)
        if user.is_authenticated:
            userType=''
            isAdministrateur = Administrateur.objects.filter(mail=user)
            isAgentMaintenance = AgentMaintenance.objects.filter(mail=user)
            isResponsableChaineProduction = ResponsableChaineProduction.objects.filter(mail=user)
            isResponsableMaintenance = ResponsableMaintenance.objects.filter(mail=user)
            isResponsableProduction = ResponsableProduction.objects.filter(mail=user)
            if isAdministrateur :
                userType='Administrateur'
                self.queryset = BonTravail.objects.all()
            elif isAgentMaintenance :
                userType='AgentMaintenance'
                self.queryset = BonTravail.objects.filter(agent_maintenance=isAgentMaintenance.values()[0]['id'])
            
            elif isResponsableChaineProduction :
                userType='ResponsableChaineProduction'
                self.queryset = BonTravail.objects.all()
            elif isResponsableMaintenance :
                userType='ResponsableMaintenance'
                self.queryset = BonTravail.objects.filter(responsable_maintenance=isResponsableMaintenance.values()[0]['id'])
            elif isResponsableProduction :
                userType='ResponsableProduction'
                self.queryset = BonTravail.objects.all()

        return super().list(request, *args, **kwargs)