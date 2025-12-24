import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function SignupPage() {
  // Context'ten registerUser fonksiyonunu al
  const { registerUser, loading } = useContext(AuthContext);

  // Form alanları
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(''); // Parola onayı

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Parolalar eşleşiyor mu kontrol et
    if (password !== password2) {
      alert('Parolalar eşleşmiyor!');
      return;
    }
    
    // Context'teki registerUser fonksiyonunu çağır
    await registerUser(name, email, password);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Kayıt Ol</h2>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
            required
          />
        </div>
        
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

        <div className="form-group">
          <label htmlFor="password2">Password confirmation:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="•••••••• (Tekrar)"
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
        </button>

        <p className="auth-switch">
          Zaten hesabınız var mı? <Link to="/login">Giriş Yapın.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;