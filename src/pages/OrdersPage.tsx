import { useEffect, useState } from "react";
import {
  fetchOrders,
  createOrder,
  updateOrderStatus,
} from "../services/OrdersService";
import type { OrderRequest, OrderResponse, OrderStatus } from "../types/orders";

function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<OrderRequest>({
    customerId: 0,
    total: 0,
  });

  async function loadOrders() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.customerId || form.total <= 0) {
      setError("Informe um cliente válido e um valor maior que zero.");
      return;
    }

    try {
      await createOrder(form);
      setForm({ customerId: 0, total: 0 });
      await loadOrders();
    } catch (err) {
      console.error(err);
      setError("Erro ao criar pedido");
    }
  }

  async function handleChangeStatus(id: number, status: OrderStatus) {
    setError("");
    try {
      await updateOrderStatus(id, status);
      await loadOrders();
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar status do pedido");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Criar novo pedido</h2>
      <form onSubmit={handleCreateOrder} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID do Cliente:</label>
          <br />
          <input
            type="number"
            value={form.customerId || ""}
            onChange={(e) =>
              setForm({ ...form, customerId: Number(e.target.value) })
            }
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Valor do Pedido:</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={form.total || ""}
            onChange={(e) =>
              setForm({ ...form, total: Number(e.target.value) })
            }
          />
        </div>

        <button type="submit">Criar Pedido</button>
      </form>

      <h2>Lista de pedidos</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Cliente
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Valor
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {o.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {o.customerName} (#{o.customerId})
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {o.customerEmail}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  R$ {o.total.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {o.status}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button
                    onClick={() => handleChangeStatus(o.id, "APROVED")}
                    disabled={o.status === "APROVED"}
                    style={{ marginRight: "8px" }}
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => handleChangeStatus(o.id, "CANCELED")}
                    disabled={o.status === "CANCELED"}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersPage;

