from django.urls import path
from .views import AdminTokenObtainView,AdminDashboardView,UserList,toggle_user_status,DeliveryList,UpdateDeliveryStatusView


app_name='Admin'

urlpatterns = [
    path('admin/token/',AdminTokenObtainView.as_view(),name='admin_token'),
    path('admin/dashboard/',AdminDashboardView.as_view(),name='admin_dashboard'),
    path('admin/userlist/',UserList.as_view(),name='userlist'),
    path('admin/users/<int:userId>/toggle-status/', toggle_user_status, name='toggle_user_status'),
    path('admin/Deliverylist/',DeliveryList.as_view(),name='deliverylist'),
    path('admin/Delivery/<int:delivery_id>/update-status/', UpdateDeliveryStatusView.as_view(), name='update-delivery-status'),
]