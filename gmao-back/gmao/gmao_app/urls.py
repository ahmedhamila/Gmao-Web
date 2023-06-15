from django.urls import path,include
from rest_framework import routers
from .views import BonTravailViewSet

router=routers.DefaultRouter()

router.register("BonTravail",BonTravailViewSet)

urlpatterns = [
    path('',include(router.urls))
]