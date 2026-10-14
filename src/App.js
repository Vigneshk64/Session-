import { useState } from "react";
import Sidebar from "./Assets/components/Sidebar";
import Navbar from "./Assets/components/Navbar";
import Dashboard from "./pages/Dashboard";
import AnimalManagement from "./pages/AnimalManagement";
import FinanceManagement from "./pages/FinanceManagement";
import "./App.css";
export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: {
      title: "Impact Dashboard",
      component: <Dashboard />,
    },
    animals: {
      title: "Animal Welfare Management",
      component: <AnimalManagement />,
    },
    finance: {
      title: "Donation & Expense Tracking",
      component: <FinanceManagement />,
    },
  };

  const currentPage = pages[activePage];

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <Navbar title={currentPage.title} />
        {currentPage.component}
      </main>
    </div>
  );
}
