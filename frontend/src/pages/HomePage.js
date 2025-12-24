import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

function HomePage() {
  // Gelen videoları saklamak için bir state (durum)
  const [videos, setVideos] = useState([]);
  
  // Hata yönetimi için
  const [error, setError] = useState(null);

  // 'useEffect' kullanarak sayfa yüklendiği anda API'den veri çekiyoruz
  useEffect(() => {
    
    // API'ye istek atacak fonksiyon
    const fetchVideos = async () => {
      try {
        // Django API'mizin adresine GET isteği at
        const response = await axios.get('http://127.0.0.1:8000/api/videos/');
        
        // Gelen veriyi (response.data) state'e kaydet
        setVideos(response.data);
      } catch (err) {
        console.error("API'den veri çekerken hata:", err);
        setError("Videolar yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      }
    };

    fetchVideos(); // Fonksiyonu çağır
  }, []); // [] -> Bu effect'in sadece sayfa ilk yüklendiğinde 1 kez çalışmasını sağlar

  return (
    <div className="home-page">
      <h2 className="page-title">Videolar</h2>
      
      {/* Hata varsa hatayı göster */}
      {error && <div className="error-message">{error}</div>}

      {/* Video kartlarının ızgara (grid) düzeni */}
      <div className="video-grid">
        {/* 'videos' state'indeki her bir video objesi için
          .map() ile dön ve bir <VideoCard> bileşeni oluştur 
        */}
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;