from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

GENDER_CHOICES = [('Male', 'Male'),
                  ('Female', 'Female'),
                  ('Others', 'Others')]


# Create your models here.
class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(choices=GENDER_CHOICES, default=None, max_length=100)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']




