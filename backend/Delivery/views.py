from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import DeliverySerializers
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from users.models import CustomUser
from django.shortcuts import get_object_or_404
from .models import Delivery, Courier
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

User = get_user_model()


class RequestDelivery(APIView):
    def post(self,request):
        data = request.data
        serializer = DeliverySerializers(data =data, context={'request': request})
        if serializer.is_valid():
            print('delivery valid')
            data = serializer.save()
            return Response(status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class DeliveryList(APIView):
    def get(self, request):
        print('helloooo')
        user_id = request.GET.get('user')  # Get the user ID from the query parameters

        if not user_id:
            return Response({"message": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)  # Assuming you have a User model
            deliveries = Delivery.objects.filter(user=user)

            if deliveries.exists():
                serializer = DeliverySerializers(deliveries, many=True, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No deliveries found."}, status=status.HTTP_404_NOT_FOUND)
        
        except User.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class DeliverySearch(APIView):
    def get(self,request):
        print('heloooooooooooooooooooooooo')
        deliveries = Delivery.objects.filter(status = 'PENDING').exclude(user=request.user)
        if deliveries.exists():
            serializer = DeliverySerializers(deliveries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message":"No available deliveries found"})


    



class AcceptDelivery(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, delivery_id):
        print('hellooo')
        delivery = get_object_or_404(Delivery, id=delivery_id)

        if delivery.status != 'PENDING':
            return Response({"message":"This delivery is not available for acceptance."},status = status.HTTP_400_BAD_REQUEST)
        
        courier = Courier.objects.create(user=request.user)
        delivery.status = 'PICKED_UP'
        delivery.courier = courier
        delivery.picked_upat = timezone.now()
        delivery.save()
        return Response(status=status.HTTP_200_OK)



class DeliveryDetailView(APIView):
    def get(self, request, delivery_id):
        try:
            # delivery = Delivery.objects.get(id=delivery_id)
            delivery = get_object_or_404(Delivery.objects.select_related('courier'), id=delivery_id)
            print(delivery,'jfjjnjnj')
            serializer = DeliverySerializers(delivery)
            data =  {
                "delivery":serializer.data,
                "courier": {
                "id": delivery.courier.id,
                "username": delivery.courier.user.username,
                "phone_number":delivery.courier.user.phone_number,
            },
            }
            print(data)
            return Response(data, status=status.HTTP_200_OK)
        except Delivery.DoesNotExist:
            return Response({"error": "Delivery not found"}, status=status.HTTP_404_NOT_FOUND)
