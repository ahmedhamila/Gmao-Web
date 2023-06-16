from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet
from .views import AgentMaintenanceViewSet

router=routers.DefaultRouter()

router.register("User",UserViewSet)
router.register("AgentMaintenance",AgentMaintenanceViewSet)

urlpatterns = [
    path('',include(router.urls))
]