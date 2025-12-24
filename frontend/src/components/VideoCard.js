import { Link } from 'react-router-dom';

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " yıl önce";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " ay önce";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " gün önce";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " saat önce";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " dakika önce";
  }
  return Math.floor(seconds) + " saniye önce";
};

function VideoCard({ video }) {
  // video objesinden (props) gelen verileri alıyoruz
  const { id, title, thumbnail, uploader, created_at } = video;

 const thumbnailUrl = thumbnail;

  return (
    // Video detay sayfasına gitmek için kartı Link yaptık (sonra yapacağız)
    <Link to={`/video/${id}`} className="video-card">
      <div className="video-thumbnail">
        <img src={thumbnailUrl} alt={title} />
      </div>
      <div className="video-details">
        <div className="uploader-avatar">
          {uploader ? uploader.name[0].toUpperCase() : 'U'}
        </div>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <p className="uploader-name">{uploader ? uploader.name : 'Bilinmeyen'}</p>
          <p className="video-stats">
            10B görüntülenme • {timeSince(created_at)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;