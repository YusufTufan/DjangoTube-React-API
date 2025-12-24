import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext); // Giriş token'ımızı context'ten al

  // Form alanları için state'ler
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !thumbnail) {
      alert('Lütfen hem video hem de küçük resim dosyası seçin.');
      return;
    }
    setLoading(true);

    // Dosya yüklerken JSON değil, 'FormData' kullanmak zorundayız.
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video_file', videoFile);
    formData.append('thumbnail', thumbnail);

    try {
      // API'ye POST isteği atıyoruz
      await axios.post('http://127.0.0.1:8000/api/videos/upload/', formData, {
        headers: {
          // Bu endpoint 'Giriş Gerekli' olduğu için token'ı header'da yolluyoruz
          'Authorization': 'Bearer ' + String(authTokens.access),
          // FormData yolladığımız için 'Content-Type' belirtmeliyiz
          'Content-Type': 'multipart/form-data'
        }
      });

      setLoading(false);
      alert('Video başarıyla yüklendi!');
      // Başarılı yüklemeden sonra 'Videolarım' sayfasına yönlendir
      navigate('/my-videos');

    } catch (error) {
      console.error('Video yüklenirken hata:', error);
      alert('Video yüklenemedi. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Yeni Video Yükle</h2>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
          />
        </div>

        {/* Dosya Yükleme Alanı - Video */}
        <div className="form-group-file">
          <label htmlFor="videoFile">Video file:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>

        {/* Dosya Yükleme Alanı - Thumbnail */}
        <div className="form-group-file">
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Yükleniyor...' : 'Şimdi Yükle'}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;