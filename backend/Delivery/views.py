from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import DeliverySerializers
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from users.models import CustomUser
from django.shortcuts import get_object_or_404

User = get_user_model()


class RequestDelivery(APIView):
    print('delivery view')
    def post(self,request):
        print('yeee delivery')
        print(request.data)
        data = request.data



        # user_id = data.get('user')
        # print(user_id,'user_id')
        # userid = get_object_or_404(CustomUser, id=user_id)
        # data['user'] = userid 
        print(data)
        serializer = DeliverySerializers(data =data, context={'request': request})
        if serializer.is_valid():
            print('delivery valid')
            data = serializer.save()
            return Response(status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    