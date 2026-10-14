`import StatCard from "../Assets/components/StatCard";
import "./StatCard.css";

export default function StatCard({ title, value, icon: Icon, note }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>
        <div className="stat-icon">
          <Icon size={20} />
        </div>
      </div>

      <h2>{value}</h2>
      <p>{note}</p>
    </div>
  );
}
`