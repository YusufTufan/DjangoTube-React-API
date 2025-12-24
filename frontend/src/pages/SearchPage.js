import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Bu hook'u URL'den 'q'yu okumak için kullanacağız
import axios from 'axios';
import VideoCard from '../components/VideoCard'; // VideoCard'ı yeniden kullanıyoruz

function SearchPage() {
  // URL'deki arama parametrelerini (query params) al
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // '?q=' kısmındaki değeri al

  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect, 'query' (arama metni) her değiştiğinde çalışacak
  useEffect(() => {
    // Eğer 'q' parametresi yoksa veya boşsa, istek atma
    if (!query) {
      setVideos([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Backend'in arama endpoint'ine (adresine) istek at
        const response = await axios.get(
          `http://127.0.0.1:8000/api/videos/search/?q=${query}`
        );
        setVideos(response.data);
      } catch (err) {
        console.error("Arama hatası:", err);
        setError("Arama sonuçları yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]); // Bağımlılık (dependency) 'query'dir

  return (
    <div className="search-page">
      <h2 className="page-title">
        Arama sonuçları: "{query}"
      </h2>
      
      {loading && <p>Yükleniyor...</p>}
      {error && <div className="error-message">{error}</div>}
      
      {/* Sonuç yoksa mesaj göster */}
      {!loading && !error && videos.length === 0 && (
        <p>"{query}" için sonuç bulunamadı.</p>
      )}

      {/* Sonuçları VideoCard ızgarası olarak göster */}
      <div className="video-grid">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;