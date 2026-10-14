
import { useState } from "react";
import { Plus, TrendingUp, Wallet, IndianRupee } from "lucide-react";

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const initialTransactions = [
  {
    id: 1,
    type: "Donation",
    description: "Public donation",
    amount: 10000,
    date: "2026-10-12",
  },
  {
    id: 2,
    type: "Expense",
    description: "Animal medicines",
    amount: 3500,
    date: "2026-10-11",
  },
  {
    id: 3,
    type: "Donation",
    description: "Animal welfare contribution",
    amount: 5000,
    date: "2026-10-10",
  },
];

export default function FinanceManagement() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    type: "Donation",
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const donations = transactions
    .filter((item) => item.type === "Donation")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  function addTransaction(event) {
    event.preventDefault();

    const amount = Number(form.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setTransactions((previous) => [
      {
        ...form,
        amount,
        id: Date.now(),
      },
      ...previous,
    ]);

    setForm({
      type: "Donation",
      description: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
    });

    setShowForm(false);
  }

  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <h2>Donations & Expenses</h2>
          <p>Track financial contributions and animal welfare spending.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      <section className="stats-grid finance-stats">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Donations</span>
            <TrendingUp size={20} />
          </div>
          <h2>{money(donations)}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Expenses</span>
            <Wallet size={20} />
          </div>
          <h2>{money(expenses)}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Net Balance</span>
            <IndianRupee size={20} />
          </div>
          <h2>{money(donations - expenses)}</h2>
        </div>
      </section>

      {showForm && (
        <form className="panel animal-form" onSubmit={addTransaction}>
          <h3>Record a Transaction</h3>

          <label>
            Transaction type
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>Donation</option>
              <option>Expense</option>
            </select>
          </label>

          <label>
            Description
            <input
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="e.g. Food and medicine"
            />
          </label>

          <label>
            Amount (₹)
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              placeholder="Enter amount"
            />
          </label>

          <label>
            Date
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </label>

          <button className="primary-button" type="submit">
            Save Transaction
          </button>
        </form>
      )}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Financial Transactions</h3>
            <p>Recorded donations and expenses</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>
                    <span
                      className={`status ${
                        item.type === "Donation"
                          ? "recovered"
                          : "treatment"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td>{money(item.amount)}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
