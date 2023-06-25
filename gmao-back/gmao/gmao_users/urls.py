from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet
from .views import AgentMaintenanceViewSet
from .views import ResponsableMaintenanceViewSet
from .views import MagasinierViewSet

router=routers.DefaultRouter()

router.register("User",UserViewSet)
router.register("AgentMaintenance",AgentMaintenanceViewSet)
router.register("ResponsableMaintenance",ResponsableMaintenanceViewSet)
router.register("Magasinier",MagasinierViewSet)

urlpatterns = [
    path('',include(router.urls))
]