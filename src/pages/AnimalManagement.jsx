
import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { recentAnimals } from "../data/sampleData";

export default function AnimalManagement() {
  const [animals, setAnimals] = useState(recentAnimals);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    species: "Dog",
    rescueDate: new Date().toISOString().slice(0, 10),
    status: "Under Treatment",
  });

  const statuses = [
    "All",
    "Recovered",
    "Under Treatment",
    "Available for Adoption",
  ];

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      `${animal.name} ${animal.id} ${animal.species}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" || animal.status === filter;

    return matchesSearch && matchesStatus;
  });

  function addAnimal(event) {
    event.preventDefault();

    const newAnimal = {
      ...form,
      id: `AN-${Date.now().toString().slice(-6)}`,
    };

    setAnimals((previous) => [newAnimal, ...previous]);
    setForm({
      name: "",
      species: "Dog",
      rescueDate: new Date().toISOString().slice(0, 10),
      status: "Under Treatment",
    });
    setShowForm(false);
  }

  function deleteAnimal(id) {
    setAnimals((previous) =>
      previous.filter((animal) => animal.id !== id)
    );
  }

  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <h2>Animal Welfare Management</h2>
          <p>Manage rescue records and animal recovery.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add Animal
        </button>
      </div>

      {showForm && (
        <form className="panel animal-form" onSubmit={addAnimal}>
          <h3>Register Rescued Animal</h3>

          <label>
            Animal name
            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter animal name"
            />
          </label>

          <label>
            Species
            <select
              value={form.species}
              onChange={(e) =>
                setForm({ ...form, species: e.target.value })
              }
            >
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Rescue date
            <input
              type="date"
              required
              value={form.rescueDate}
              onChange={(e) =>
                setForm({ ...form, rescueDate: e.target.value })
              }
            />
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Under Treatment</option>
              <option>Recovered</option>
              <option>Available for Adoption</option>
              <option>Adopted</option>
            </select>
          </label>

          <button className="primary-button" type="submit">
            Save Animal
          </button>
        </form>
      )}

      <section className="panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search animal name, ID or species..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter animals by status"
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Animal ID</th>
                <th>Name</th>
                <th>Species</th>
                <th>Rescue Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAnimals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.rescueDate}</td>
                  <td>
                    <span className="status">
                      {animal.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteAnimal(animal.id)}
                      aria-label={`Delete ${animal.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAnimals.length === 0 && (
                <tr>
                  <td colSpan="6">No matching animals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
