from django.urls import path,include
from rest_framework import routers
from .views import BonTravailViewSet
from .views import DemandeInterventionViewSet
from .views import EquipementViewSet

router=routers.DefaultRouter()

router.register("BonTravail",BonTravailViewSet)
router.register("DemandeIntervention",DemandeInterventionViewSet)
router.register("Equipement",EquipementViewSet)

urlpatterns = [
    path('',include(router.urls))
]