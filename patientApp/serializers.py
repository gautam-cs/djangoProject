from datetime import datetime

from rest_framework import serializers
from patientApp.models import Patient, GENDER_CHOICES
from phonenumber_field.serializerfields import PhoneNumberField
from django.utils import timezone
import pytz


class PatientSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    gender = serializers.ChoiceField(choices=GENDER_CHOICES, default=None)
    phone = PhoneNumberField()

    def create(self, validated_data):
        """
        Create and return a new `Patient` instance, given the validated data.
        """
        return Patient.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Patient` instance, given the validated data.
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.updated_at = timezone.now()
        instance.save()
        return instance
