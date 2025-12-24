import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams, URL'den 'id'yi alır
import axios from 'axios';
import AuthContext from '../context/AuthContext';

// Tarih formatlama fonksiyonunu VideoCard'dan buraya da alalım
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " yıl önce";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " ay önce";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " gün önce";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " saat önce";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " dakika önce";
  return Math.floor(seconds) + " saniye önce";
};

function VideoDetailPage() {
  // URL'den videonun 'id'sini al (örn: /video/1 -> id='1')
  const { id } = useParams(); 
  const { user, authTokens } = useContext(AuthContext); // Yorum yapmak için 'user' lazım

  // Sayfanın state'leri
  const [video, setVideo] = useState(null); // Video objesi (ve yorumları)
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(""); // Yeni yorum metni
  const [loading, setLoading] = useState(true);

  // Video verisini ve yorumları çeken fonksiyon
  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      // Backend'deki VideoDetail endpoint'ine (adresine) istek at
      const response = await axios.get(`http://127.0.0.1:8000/api/videos/${id}/`);
      setVideo(response.data);
      setError(null);
    } catch (err) {
      console.error("Video detayı çekilirken hata:", err);
      setError("Video yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  // Sayfa ilk yüklendiğinde ve 'id' değiştiğinde videoyu çek
  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  // Yorum gönderme fonksiyonu
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Boş yorum gönderme
    if (!user) {
      alert("Yorum yapmak için giriş yapmalısınız.");
      return;
    }

    try {
      // Backend'deki CommentCreate endpoint'ine (adresine) istek at
      await axios.post(
        `http://127.0.0.1:8000/api/videos/${id}/comment/`, 
        { text: newComment }, // Yolladığımız veri (sadece 'text')
        {
          headers: {
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        }
      );
      setNewComment(""); // Yorum kutusunu temizle
      // Yorum listesini güncellemek için veriyi yeniden çek
      fetchVideoDetails(); 
    } catch (err) {
      console.error("Yorum gönderilirken hata:", err);
      alert("Yorum gönderilemedi. (Hâlâ 401 hatası mı alıyorsun?)");
    }
  };

  // Yükleniyorsa veya video bulunamadıysa...
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <div className="error-message">{error}</div>;
  if (!video) return <p>Video bulunamadı.</p>;

  // Video dosyasının tam URL'sini oluştur (Django /media/... verir)
  const videoUrl = video.video_file ? video.video_file : "";

  return (
    <div className="video-detail-page">
      
      {/* 1. Video Oynatıcı */}
      <div className="video-player-container">
        <video controls autoPlay className="video-player" src={videoUrl}>
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>

      {/* 2. Video Başlığı ve Bilgileri */}
      <h1 className="video-detail-title">{video.title}</h1>
      <div className="video-detail-meta">
        <Link to={`/channel/${video.uploader.id}`} className="uploader-info">
          <div className="uploader-avatar">
            {video.uploader.name[0].toUpperCase()}
          </div>
          <div className="uploader-meta">
            <span className="uploader-name">{video.uploader.name}</span>
            <span className="uploader-stats">100 Abone</span>
          </div>
        </Link>
        <div className="video-stats">
          <span>10B Görüntülenme</span>
          <span>•</span>
          <span>{timeSince(video.created_at)}</span>
        </div>
      </div>

      {/* 3. Açıklama */}
      <div className="video-description">
        <p>{video.description || "Açıklama yok."}</p>
      </div>

      <hr className="divider" />

      {/* 4. Yorumlar Bölümü */}
      <div className="comments-section">
        <h3>Yorumlar ({video.comments.length})</h3>

        {/* Yeni Yorum Yapma Formu */}
        {user && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="uploader-avatar">
              {user.name ? user.name[0].toUpperCase() : 'Y'}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Yorum ekle..."
              rows="3"
            />
            <button type="submit">Yorum Yap</button>
          </form>
        )}
        {!user && <p><Link to="/login">Yorum yapmak için giriş yapın.</Link></p>}


        {/* Mevcut Yorumların Listesi */}
        <div className="comment-list">
          {video.comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="uploader-avatar">
                {comment.user.name[0].toUpperCase()}
              </div>
              <div className="comment-content">
                <span className="comment-author">
                  {comment.user.name}
                  <span className="comment-date">
                    • {timeSince(comment.created_at)}
                  </span>
                </span>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;