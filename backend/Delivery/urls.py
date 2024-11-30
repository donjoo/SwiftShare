from django.urls import path
from .views import RequestDelivery,DeliveryList,DeliverySearch,AcceptDelivery,DeliveryDetailView


app_name='Delivery'

urlpatterns = [
    path('request_delivery/',RequestDelivery.as_view(),name='request_delivery'),
    path('deliverylist/',DeliveryList.as_view(),name='delivery_list'),
    path('deliverysearch/',DeliverySearch.as_view(),name="delivery_search"),
    path('<int:delivery_id>/acceptdelivery/',AcceptDelivery.as_view(),name='accept_delivery'),
    path('<int:delivery_id>/deliverydetail/',DeliveryDetailView.as_view(),name='delivery_detail'),

]
