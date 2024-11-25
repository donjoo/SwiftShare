from rest_framework import serializers;
from .models import Addresses, Delivery, Courier, CourierPerformance
from users.models import CustomUser



class AddressesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Addresses
        fields = ['id','address_line_1','address_line_2','city','state','postal_code','country']


class CourierSerializers(serializers.ModelSerializer):
    user =  serializers.StringRelatedField()

    class Meta:
        model = Courier
        fields = ['id','user']


class DeliverySerializers(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())  # Allow accepting user IDs
    from_address = AddressesSerializers()
    to_address = AddressesSerializers()
    courier = serializers.PrimaryKeyRelatedField(queryset=Courier.objects.all(), required=False, allow_null=True)  # Allow null for courier

    class Meta:
        model= Delivery
        fields = ['id', 'user','from_address','to_address','package_size','courier','status','delivered_at','picked_upat','created_at','updated_at']

    def create(self, validated_data):
        # Extract the nested address data
        from_address_data = validated_data.pop('from_address')
        to_address_data = validated_data.pop('to_address')
        # user = self.context['request'].user  # Access the user from the request context
        # userr = CustomUser.objects.filter(id=user.id).first()
        # validated_data['user'] = userr 

        # Create the address objects
       

        from_address = Addresses.objects.create(**from_address_data)
        to_address = Addresses.objects.create(**to_address_data)

        # Create the Delivery object
        delivery = Delivery.objects.create(
            # user = validated_data['user'],
            from_address=from_address,
            to_address=to_address,
            **validated_data
        )

        return delivery
    




class CourierPerformanceSerializer(serializers.ModelSerializer):

    courier = CourierSerializers()
    delivery = DeliverySerializers()


    class Meta:
        model = CourierPerformance
        fields = ['id','courier','delivery','amount','rating']




