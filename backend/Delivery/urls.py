from django.urls import path
from .views import RequestDelivery,DeliveryList,DeliverySearch


app_name='Delivery'

urlpatterns = [
    path('request_delivery/',RequestDelivery.as_view(),name='request_delivery'),
    path('deliverylist/',DeliveryList.as_view(),name='delivery_list'),
    path('deliverysearch/',DeliverySearch.as_view(),name="delivery_search"),

]
