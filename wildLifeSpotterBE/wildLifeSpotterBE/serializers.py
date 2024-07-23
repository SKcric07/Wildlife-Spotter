from rest_framework import serializers
from database.models import User, ProfileDetails, UserDetails
from datetime import datetime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        year = datetime.now().year

        # Save user details in MongoDB
        details_data = {
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'email': instance.email,
            'year': year,  
            }

        ProfileDetails.objects.create(username=instance.email, details=details_data)

        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()

        # Update user details in MongoDB
        details_data = {
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'email': instance.email
        }
        ProfileDetails.objects.filter(username=instance.email).update(details=details_data)

        return instance

    def partial_update(self, instance, validated_data):
        return self.update(instance, validated_data)

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['first_name', 'last_name', 'email']

class ProfileDetailsSerializer(serializers.ModelSerializer):
    details = UserDetailsSerializer()

    class Meta:
        model = ProfileDetails
        fields = ['username', 'details']

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        user_details = UserDetails(**details_data)

        profile_details = ProfileDetails.objects.create(
            username=validated_data['username'],
            details=user_details
        )
        return profile_details

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        details_data = validated_data.get('details', {})
        if details_data:
            instance.details.first_name = details_data.get('first_name', instance.details.first_name)
            instance.details.last_name = details_data.get('last_name', instance.details.last_name)
            instance.details.email = details_data.get('email', instance.details.email)
            instance.save()
        return instance
