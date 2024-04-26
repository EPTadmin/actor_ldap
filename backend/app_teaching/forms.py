from django import forms
from django.forms import ModelForm
from .models import *

class CourseAdminForm(ModelForm):


    class Meta:
        model = Course
        fields = '__all__'



