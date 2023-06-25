from django.urls import path,include
from rest_framework import routers
from .views import BonTravailViewSet
from .views import DemandeInterventionViewSet
from .views import EquipementViewSet
from .views import PieceRechangeViewSet
from .views import BonApprovisionnementViewSet

router=routers.DefaultRouter()

router.register("BonTravail",BonTravailViewSet)
router.register("DemandeIntervention",DemandeInterventionViewSet)
router.register("Equipement",EquipementViewSet)
router.register("PieceRechange",PieceRechangeViewSet)
router.register("BonApprovisionnement",BonApprovisionnementViewSet)

urlpatterns = [
    path('',include(router.urls))
]