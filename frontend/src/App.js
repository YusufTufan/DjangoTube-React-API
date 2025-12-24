import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import MyVideosPage from './pages/MyVideosPage';
import SearchPage from './pages/SearchPage';
import VideoDetailPage from './pages/VideoDetailPage';

import ShortsPage from './pages/ShortsPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        {/* 1. SABİT NAVBAR (HER SAYFADA) */}
        <Navbar />

        <div className="main-container">
          {/* 2. SABİT SIDEBAR (HER SAYFADA) */}
          <Sidebar />

          {/* 3. DEĞİŞKEN İÇERİK (SAYFA) */}
          <div className="content-area">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/video/:id" element={<VideoDetailPage />} />

              <Route path="/shorts" element={<ShortsPage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/history" element={<HistoryPage />} />

              <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>}/>
              <Route path="/my-videos" element={<ProtectedRoute><MyVideosPage /></ProtectedRoute>}/>
              
              
            </Routes>
          </div>
        </div>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
