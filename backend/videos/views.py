from rest_framework import generics, permissions
from .models import Video, Comment
from .serializers import VideoSerializer, CommentSerializer
from rest_framework.filters import SearchFilter

from rest_framework.response import Response
from prometheus_client import Counter

VIDEO_VIEW_COUNTER = Counter(
    "video_views_total",  # Metriğin adı (Grafana'da bunu arayacağız)
    "Total number of views for each video",  # Açıklama
    ["video_title"],  # Etiket (Hangi video izlendi?)
)


# --- Video View'ları ---
class VideoList(generics.ListAPIView):
    """
    Tüm videoları listeler. (home.jpg)
    """

    queryset = Video.objects.all().order_by("-created_at")  # En yeniden eskiye
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]  # Herkes görebilir


class VideoUpload(generics.CreateAPIView):
    """
    Yeni video yükler. (upload.png)
    Sadece giriş yapmış kullanıcılar yükleyebilir.
    """

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]  # GİRİŞ GEREKLİ

    def perform_create(self, serializer):
        # Videoyu yükleyen kişiyi (uploader) otomatik olarak
        # o an giriş yapmış kullanıcı (request.user) olarak ayarlar.
        serializer.save(uploader=self.request.user)


class VideoDetail(generics.RetrieveAPIView):
    """
    Tek bir videonun detayını (yorumlarıyla birlikte) gösterir. (x.png)
    """

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]  # Herkes görebilir

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Sayaç burada artıyor! "Biri bu videoyu izledi" diyoruz.
        VIDEO_VIEW_COUNTER.labels(video_title=instance.title).inc()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class MyVideos(generics.ListAPIView):
    """
    Sadece o an giriş yapmış kullanıcının videolarını listeler. (myvideos.png)
    """

    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]  # GİRİŞ GEREKLİ

    def get_queryset(self):
        # Sadece 'uploader'ı 'request.user' olan videoları getir.
        return Video.objects.filter(uploader=self.request.user).order_by("-created_at")


class SearchVideos(generics.ListAPIView):
    """
    Video başlığında (title) arama yapar. (search.png)
    URL formatı: /api/videos/search/?q=react
    """

    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

    # DRF'in SearchFilter'ını kullanıyoruz
    filter_backends = [SearchFilter]
    # 'title' ve 'description' alanlarında arama yap
    search_fields = ["title", "description"]

    def get_queryset(self):
        # URL'den 'q' parametresini al (örn: ?q=react)
        query = self.request.query_params.get("q", None)
        if query:
            # Arama filtresini uygula
            return super().get_queryset().filter(title__icontains=query)
        # Eğer ?q= parametresi yoksa boş liste döndür
        return Video.objects.none()


# --- Yorum View'ı ---
class CommentCreate(generics.CreateAPIView):
    """
    Bir videoya yeni yorum ekler. (x.png'deki 'Yorum Yap' butonu)
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]  # GİRİŞ GEREKLİ

    def perform_create(self, serializer):
        # Yorumun hangi videoya ait olduğunu URL'den almalıyız
        # URL formatı: /api/videos/<video_pk>/comment/
        video_id = self.kwargs.get("video_pk")
        video = Video.objects.get(pk=video_id)

        # Yorumu yapanı (user) ve ait olduğu videoyu (video) otomatik ayarla
        serializer.save(user=self.request.user, video=video)
