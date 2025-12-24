"""
URL configuration for djangotube_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import MyTokenObtainPairView

urlpatterns = [
    path("admin/", admin.site.urls),
    # 1. GİRİŞ (Login) ve TOKEN YENİLEME
    # /api/auth/login/ -> (email, password) yolla, 'access' ve 'refresh' token al
    path("api/auth/login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # /api/auth/token/refresh/ -> 'refresh' token yolla, yeni 'access' token al
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # 2. KAYIT (Register)
    # /api/auth/register/ adresini 'users' app'ine yönlendir
    path("api/auth/", include("users.urls")),
    # 3. VİDEOLAR ve YORUMLAR
    # /api/videos/ ile başlayan tüm adresleri 'videos' app'ine yönlendir
    path("api/videos/", include("videos.urls")),
    # 4. Prometheus Monitoring
    path("prometheus/", include("django_prometheus.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
