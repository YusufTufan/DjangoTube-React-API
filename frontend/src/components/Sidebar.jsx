import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link to="/my-videos">Videolarım</Link> 
        </li>
        <li>
          <Link to="/shorts">Shorts</Link>
        </li>
        <li>
          <Link to="/subscriptions">Abonelikler</Link>
        </li>
        <li>
          <Link to="/history">Geçmiş</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;