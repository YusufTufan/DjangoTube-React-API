from django.urls import path
from .views import (
    VideoList,
    VideoUpload,
    VideoDetail,
    MyVideos,
    SearchVideos,
    CommentCreate,
)

urlpatterns = [
    # /api/videos/
    path("", VideoList.as_view(), name="video-list"),
    # /api/videos/upload/
    path("upload/", VideoUpload.as_view(), name="video-upload"),
    # /api/videos/my-videos/
    path("my-videos/", MyVideos.as_view(), name="my-videos"),
    # /api/videos/search/?q=react
    path("search/", SearchVideos.as_view(), name="video-search"),
    # /api/videos/1/ (Video detay)
    path("<int:pk>/", VideoDetail.as_view(), name="video-detail"),
    # /api/videos/1/comment/ (Yorum ekleme)
    path("<int:video_pk>/comment/", CommentCreate.as_view(), name="comment-create"),
]
