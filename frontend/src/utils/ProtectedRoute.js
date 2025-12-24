import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// Bu bileşen, içine koyduğumuz 'children'ı (UploadPage gibi)
// sadece kullanıcı giriş yaptıysa gösterir.
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // AuthContext'ten user bilgisini al

  if (!user) {
    // Eğer kullanıcı 'null' ise (giriş yapmamışsa),
    // onu '/login' sayfasına yönlendir.
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı varsa (giriş yapmışsa),
  // 'children'ı (yani UploadPage'i) göster.
  return children;
};

export default ProtectedRoute;