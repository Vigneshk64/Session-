
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import StatCard from "../Assets/components/StatCard.jsx";
import {
  PawPrint,
  Heart,
  House,
  Wallet,
} from "lucide-react";

import {
  stats,
  monthlyData,
  recentAnimals,
  financeData,
} from "../data/sampleData";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="stats-grid">
        <StatCard
          title="Animals Rescued"
          value={stats.rescued}
          icon={PawPrint}
          note="Total rescue records"
        />

        <StatCard
          title="Animals Recovered"
          value={stats.recovered}
          icon={Heart}
          note={`${Math.round(
            (stats.recovered / stats.rescued) * 100
          )}% of rescued animals`}
        />

        <StatCard
          title="Animals Adopted"
          value={stats.adopted}
          icon={House}
          note="Successful adoptions"
        />

        <StatCard
          title="Donations Received"
          value={money(stats.donations)}
          icon={Wallet}
          note={`Expenses: ${money(stats.expenses)}`}
        />
      </section>

      <section className="charts-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Rescue & Adoption Trends</h3>
              <p>Monthly animal welfare activity</p>
            </div>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="rescueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="rescued"
                  stroke="#16a34a"
                  fill="url(#rescueGradient)"
                  strokeWidth={2}
                  name="Rescued"
                />

                <Area
                  type="monotone"
                  dataKey="adopted"
                  stroke="#0284c7"
                  fill="none"
                  strokeWidth={2}
                  name="Adopted"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Donations vs Expenses</h3>
              <p>Monthly financial overview</p>
            </div>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => money(value)} />

                <Bar
                  dataKey="donations"
                  fill="#16a34a"
                  radius={[5, 5, 0, 0]}
                  name="Donations"
                />

                <Bar
                  dataKey="expenses"
                  fill="#f59e0b"
                  radius={[5, 5, 0, 0]}
                  name="Expenses"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="panel records-panel">
        <div className="panel-header">
          <div>
            <h3>Recent Rescue Records</h3>
            <p>Latest registered animals</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Animal</th>
                <th>Species</th>
                <th>Rescue Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentAnimals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.rescueDate}</td>
                  <td>
                    <span
                      className={`status ${
                        animal.status === "Recovered"
                          ? "recovered"
                          : animal.status === "Under Treatment"
                          ? "treatment"
                          : "adoption"
                      }`}
                    >
                      {animal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="demo-note">
        Demonstration dashboard · Figures are sample data.
      </p>
    </div>
  );
}
