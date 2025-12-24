from django.contrib import admin
from .models import CustomUser

# CustomUser modelimizi admin paneline kaydediyoruz
admin.site.register(CustomUser)
