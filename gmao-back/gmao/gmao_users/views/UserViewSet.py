from rest_framework import viewsets
from ..serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from ..models import Administrateur
from ..models import AgentMaintenance
from ..models import Magasinier
from ..models import ResponsableChaineProduction
from ..models import ResponsableMaintenance
from ..models import ResponsableProduction

from ..serializers import AdministrateurSerializer
from ..serializers import AgentMaintenanceSerializer
from ..serializers import MagasinierSerializer
from ..serializers import ResponsableChaineProductionSerializer
from ..serializers import ResponsableMaintenanceSerializer
from ..serializers import ResponsableProductionSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    queryset=User.objects.all()
    permission_classes = [AllowAny]


    @action(detail=False,methods=['POST'])
    def getUser(self,request):
        try:
            userType=''
            requestToken=request.data['Token']
            print(requestToken)
            tokenUser = Token.objects.get(key=requestToken).user

            print(tokenUser)

            isAdministrateur = Administrateur.objects.filter(mail=tokenUser)
            isAgentMaintenance = AgentMaintenance.objects.filter(mail=tokenUser)
            isMagasinier = Magasinier.objects.filter(mail=tokenUser)
            isResponsableChaineProduction = ResponsableChaineProduction.objects.filter(mail=tokenUser)
            isResponsableMaintenance = ResponsableMaintenance.objects.filter(mail=tokenUser)
            isResponsableProduction = ResponsableProduction.objects.filter(mail=tokenUser)

            tokenUserSerialized=UserSerializer(tokenUser)
            if isAdministrateur :
                userType='Administrateur'
                tokenUserSerialized = AdministrateurSerializer(Administrateur.objects.get(mail=isAdministrateur.values()[0]['mail']) , context={'request': request})
            elif isAgentMaintenance :
                userType='AgentMaintenance'
                tokenUserSerialized = AgentMaintenanceSerializer(AgentMaintenance.objects.get(mail =isAgentMaintenance.values()[0]['mail']),context={'request': request})
            elif isMagasinier :
                userType='Magasinier'
                tokenUserSerialized = MagasinierSerializer(Magasinier.objects.get(mail =isMagasinier.values()[0]['mail']),context={'request': request})
            elif isResponsableChaineProduction :
                userType='ResponsableChaineProduction'
                tokenUserSerialized = ResponsableChaineProductionSerializer(ResponsableChaineProduction.objects.get(mail =isResponsableChaineProduction.values()[0]['mail']),context={'request': request})
            elif isResponsableMaintenance :
                print("here")
                userType='ResponsableMaintenance'
                tokenUserSerialized = ResponsableMaintenanceSerializer(ResponsableMaintenance.objects.get(mail =isResponsableMaintenance.values()[0]['mail']),context={'request': request})
            elif isResponsableProduction :
                userType='ResponsableProduction'
                tokenUserSerialized = ResponsableProductionSerializer(ResponsableProduction.objects.get(mail =isResponsableProduction.values()[0]['mail']),context={'request': request})
            return Response({'Token':requestToken,'UserType':userType,'user':tokenUserSerialized.data},status=status.HTTP_200_OK)
        except:
            return Response({"message": "Errorrr"}, status=status.HTTP_400_BAD_REQUEST)