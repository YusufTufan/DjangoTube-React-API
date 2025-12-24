from django.db import models
from django.conf import settings  # CustomUser modelini çekmek için


class Video(models.Model):
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    video_file = models.FileField(upload_to="videos/")
    thumbnail = models.ImageField(upload_to="thumbnails/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    # Hangi videoya ait? (Videoyu silince yorumlar da silinsin -> CASCADE)
    video = models.ForeignKey(Video, related_name="comments", on_delete=models.CASCADE)

    # KİM yazdı? (Kullanıcıyı silince yorumlar da silinsin -> CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Yorum metni
    text = models.TextField()

    # Yorum tarihi
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.video.title}"
