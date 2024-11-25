from django.urls import path
from .views import RequestDelivery


app_name='Delivery'

urlpatterns = [
    path('request_delivery/',RequestDelivery.as_view(),name='request_delivery'),

]
