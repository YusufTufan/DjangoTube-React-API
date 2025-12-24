from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # 'signup.png' ekranına göre 'email', 'name', 'password' alıyoruz.
        fields = ("id", "email", "name", "password")
        # Parolayı API'de okunamaması için 'write_only' yapıyoruz.
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Bu 'create' metodu, parola'yı düz metin değil,
        # 'hash'leyerek (şifreleyerek) kaydetmemizi sağlar.
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"],
        )
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Varsayılan serializer'ı eziyoruz.
    Bu, 'email' ile giriş yapılmasını sağlar.

    Ayrıca token'ın içine 'name' ve 'email'i de ekliyoruz
    (React'te "Merhaba, Yusuf" demek için).
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Token'ın 'payload' kısmına özel alanlar ekle
        token["name"] = user.name
        token["email"] = user.email

        return token
