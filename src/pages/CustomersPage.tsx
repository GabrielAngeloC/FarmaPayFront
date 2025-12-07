import { useEffect, useState } from "react";
import { fetchCustomers, createCustomer } from "../services/customerService";
import type { CustomerRequest, CustomerResponse } from "../types/customer";

function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CustomerRequest>({
    name: "",
    email: "",
    document: "",
  });

  const [error, setError] = useState<string>("");

  async function loadCustomers() {
    setLoading(true);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      setError(`Erro ao carregar clientes ${err}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await createCustomer(form);
      await loadCustomers();
      setForm({ name: "", email: "", document: "" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(`Erro ao criar cliente ${err}`);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clientes</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Cadastrar novo cliente</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nome:</label><br />
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Documento:</label><br />
          <input
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de clientes</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : customers.length === 0 ? (
        <p>Nenhum cliente encontrado</p>
      ) : (
        <ul>
          {customers.map((c) => (
            <li key={c.id}>
              {c.name} — {c.email} — {c.document || "Sem doc"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomersPage;
