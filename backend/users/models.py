from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    "email" alanı ile kullanıcı oluşturan özel yönetici sınıfı.
    """

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email alanı zorunludur")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser is_staff=True olmalıdır.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser is_superuser=True olmalıdır.")
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    # Varsayılan "username" alanını kaldırıyoruz.
    username = None

    # email alanını benzersiz (unique) ve ana giriş (USERNAME_FIELD) yapıyoruz.
    email = models.EmailField("email address", unique=True)

    # name alanını ekliyoruz (signup.png'de soruluyordu)
    name = models.CharField(max_length=255, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]  # Superuser oluştururken 'name' de sorulsun

    objects = CustomUserManager()

    def __str__(self):
        return self.email
