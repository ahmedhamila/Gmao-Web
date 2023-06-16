from rest_framework import viewsets
from ..serializers import BonTravailSerializer
from ..models import BonTravail
from gmao_users.models import AgentMaintenance
from gmao_users.models import ResponsableMaintenance
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class BonTravailViewSet(viewsets.ModelViewSet):
    serializer_class=BonTravailSerializer
    queryset=BonTravail.objects.all()
    permission_classes = [AllowAny]


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