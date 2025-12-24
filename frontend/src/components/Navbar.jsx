import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LogoIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width="30" 
    height="30"
    style={{ color: '#FF0000' }}
  >
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  
  // Arama çubuğuna yazılan metni saklamak için state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sayfa yönlendirmesi için
  const navigate = useNavigate();

  // Form gönderildiğinde (Ara butonuna basılınca)
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Formun sayfayı yenilemesini engelle
    if (!searchQuery.trim()) {
      return; // Arama boşsa bir şey yapma
    }
    // Kullanıcıyı arama sonuçları sayfasına yönlendir
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <LogoIcon />
          <span>DjangoTube</span>
        </Link>
      </div>
      
      <div className="navbar-center">
        {/* Form'a onSubmit olayı ekledik */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          {/* Input'a value ve onChange ekledik */}
          <input
            type="text"
            placeholder="Ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Ara</button>
        </form>
      </div>
      
      <div className="navbar-right">
        {user ? (
          <>
            <span className="nav-link-welcome">
              Merhaba, {user.name || user.email}
            </span>
            <Link to="/upload" className="nav-link nav-button-primary">Video Yükle</Link>
            {/* Merhaba yazısını token'dan al (email yerine name) */}
            
            <button onClick={logoutUser} className="nav-link-button nav-button-destructive">
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/upload" className="nav-link nav-button-primary">Video Yükle</Link>
            <Link to="/login" className="nav-link">Giriş Yap</Link>
            <Link to="/signup" className="nav-link">Kayıt Ol</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;