from rest_framework import serializers
from .models import Video, Comment
from users.serializers import CustomUserSerializer


class CommentSerializer(serializers.ModelSerializer):
    # Yorumu yapan kullanıcının tam bilgisini (email, name)
    # göstermek için 'user' alanını 'read_only=True' ile eziyoruz.
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "text", "user", "created_at")


class VideoSerializer(serializers.ModelSerializer):
    # Videoyu yükleyenin (uploader) detaylı bilgisini göstermek için
    uploader = CustomUserSerializer(read_only=True)

    # Video detay sayfasında (x.png) yorumları da göstermek için
    # 'related_name' olarak "comments" kullanmıştık.
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = (
            "id",
            "title",
            "description",
            "video_file",
            "thumbnail",
            "created_at",
            "uploader",
            "comments",
        )
