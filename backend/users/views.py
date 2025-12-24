from rest_framework import generics
from .models import CustomUser
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    Yeni kullanıcı kaydı oluşturur.
    (signup.png ekranı için)
    """

    queryset = CustomUser.objects.all()
    # Herkesin kayıt olabilmesi için (giriş yapmamış olanların bile)
    permission_classes = (AllowAny,)
    serializer_class = CustomUserSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Bizim özel 'email' ile giriş serializer'ımızı kullanır.
    """

    serializer_class = MyTokenObtainPairSerializer
