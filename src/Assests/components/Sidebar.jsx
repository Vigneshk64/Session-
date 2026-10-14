
import {
  PawPrint,
  LayoutDashboard,
  Wallet,
  Heart,
} from "lucide-react";

const links = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Animal Welfare", icon: PawPrint, id: "animals" },
  { label: "Finance", icon: Wallet, id: "finance" },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Heart size={24} />
        </div>
        <div>
          <h2>KindPaws</h2>
          <p>Impact Analytics</p>
        </div>
      </div>

      <p className="nav-label">WORKSPACE</p>

      <nav>
        {links.map(({ label, icon: Icon, id }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? "active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="avatar">NG</div>
        <div>
          <strong>NGO Admin</strong>
          <p>Demo account</p>
        </div>
      </div>
    </aside>
  );
}
