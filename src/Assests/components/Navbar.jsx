
import { Bell, Search } from "lucide-react";

export default function Navbar({ title }) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">ANIMAL WELFARE MANAGEMENT</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="search-placeholder">
          <Search size={17} />
          <span>Impact overview</span>
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
        </button>
      </div>
    </header>
  );
}
