import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const { authTokens } = useContext(AuthContext); // Token'ı al

  useEffect(() => {
    const fetchMyVideos = async () => {
      // Eğer token yoksa (kullanıcı giriş yapmamışsa) istek atma
      if (!authTokens) {
        setError('Bu sayfayı görmek için giriş yapmalısınız.');
        return;
      }

      try {
        // 'Videolarım' endpoint'ine, header'da token ile istek at
        const response = await axios.get('http://127.0.0.1:8000/api/videos/my-videos/', {
          headers: {
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        });
        setVideos(response.data);
      } catch (err) {
        console.error("Videolarım çekerken hata:", err);
        setError("Videolarınız yüklenemedi.");
      }
    };

    fetchMyVideos();
  }, [authTokens]); // authTokens değiştiğinde (örn: giriş yapınca) tekrar çalış

  return (
    <div className="my-videos-page">
      <h2 className="page-title">Videolarım</h2>
      
      {error && <div className="error-message">{error}</div>}

      {/* Video listesi boşsa mesaj göster */}
      {!error && videos.length === 0 && (
        <p>Henüz hiç video yüklememişsiniz.</p>
      )}

      <div className="video-grid">
        {/* Gelen videoları VideoCard ile ekrana bas */}
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default MyVideosPage;