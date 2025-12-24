import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function LoginPage() {
  // Context'ten loginUser fonksiyonunu ve yüklenme durumunu al
  const { loginUser, loading } = useContext(AuthContext);

  // Form alanları için state'ler
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    if (!email || !password) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    // Context'teki loginUser fonksiyonunu çağır
    await loginUser(email, password);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Giriş Yap</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ysv@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>

        <p className="auth-switch">
          Hesabınız yok mu? <Link to="/signup">Hemen Kayıt Olun.</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;