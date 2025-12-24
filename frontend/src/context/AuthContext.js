import { createContext, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Context'in kendisini oluştur
const AuthContext = createContext();

export default AuthContext;

// 2. Context'i "sağlayan" (Provider) bileşeni oluştur
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const API_URL = 'http://127.0.0.1:8000/api'; // API adresimiz

  // 'localStorage'da token varsa al, yoksa 'null' ata
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  
  // Token'ı 'jwt-decode' ile çözüp kullanıcı bilgisini al
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)
      : null
  );

  const [loading, setLoading] = useState(false);

  /**
   * 1. GİRİŞ YAP (LOGIN) FONKSİYONU
   */
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      // Backend'in /api/auth/login/ adresine POST isteği at
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        // Gelen token'ları state'e ve localStorage'a kaydet
        setAuthTokens(data);
        setUser(jwtDecode(data.access)); // Token'ı çözüp user state'ine at
        
        localStorage.setItem('authTokens', JSON.stringify(data));
        
        navigate('/'); // Başarılı girişte Ana Sayfaya yönlendir
      } 
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Email veya şifre hatalı!');

      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  /**
   * 2. KAYIT OL (SIGNUP) FONKSİYONU
   */
  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      // Backend'in /api/auth/register/ adresine POST isteği at
      const response = await axios.post(`${API_URL}/auth/register/`, {
        name: name,
        email: email,
        password: password,
      });

      if (response.status === 201) { // 201 Created
        alert('Kayıt başarılı! Lütfen giriş yapın.');
        navigate('/login'); // Başarılı kayıtta Login Sayfasına yönlendir
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      // Django'dan gelen detaylı hata mesajlarını gösterebiliriz
      if (error.response && error.response.data) {
        alert('Kayıt başarısız: ' + JSON.stringify(error.response.data));
      } else {
        alert('Bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 3. ÇIKIŞ YAP (LOGOUT) FONKSİYONU
   */
  const logoutUser = () => {
    // State'i ve localStorage'ı temizle
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login'); // Çıkış yapınca Login'e yolla
  };

  // Tüm uygulama ile paylaşacağımız veriler
  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    loading: loading,
  };

  // Bu AuthProvider, App.js'deki <Router>'ı sarmalayacak
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};