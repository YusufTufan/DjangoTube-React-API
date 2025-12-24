from django.contrib import admin
from .models import Video, Comment

# Video ve Comment modellerimizi admin paneline kaydediyoruz
admin.site.register(Video)
admin.site.register(Comment)
