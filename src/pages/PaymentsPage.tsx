import { useEffect, useState } from "react";
import {
  fetchPayments,
  createPayment,
} from "../services/paymentsService";
import type {
  PaymentMethod,
  PaymentRequest,
  PaymentResponse,
} from "../types/payment";

function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<PaymentRequest>({
    orderId: 0,
    amountPaid: 0,
    method: "PIX",
  });

  async function loadPayments() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPayments();
      setPayments(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar pagamentos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.orderId || form.amountPaid <= 0) {
      setError("Informe um pedido válido e um valor maior que zero.");
      return;
    }

    try {
      await createPayment(form);
      setForm({ orderId: 0, amountPaid: 0, method: "PIX" });
      await loadPayments();
    } catch (err: any) {
      console.error(err);
      setError("Erro ao criar pagamento. Verifique se o pedido existe, se não está cancelado, se não possui outro pagamento e se o valor é igual ao valor do pedido.");
    }
  }

  function handleChangeMethod(method: PaymentMethod) {
    setForm({ ...form, method });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pagamentos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Registrar novo pagamento</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID do Pedido:</label>
          <br />
          <input
            type="number"
            value={form.orderId || ""}
            onChange={(e) =>
              setForm({ ...form, orderId: Number(e.target.value) })
            }
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Valor Pago:</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={form.amountPaid || ""}
            onChange={(e) =>
              setForm({ ...form, amountPaid: Number(e.target.value) })
            }
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Método de Pagamento:</label>
          <br />
          <select
            value={form.method}
            onChange={(e) => handleChangeMethod(e.target.value as PaymentMethod)}
          >
            <option value="PIX">PIX</option>
            <option value="CARD">Cartão</option>
            <option value="BOLETO">Boleto</option>
          </select>
        </div>

        <button type="submit">Registrar Pagamento</button>
      </form>

      <h2>Lista de pagamentos</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : payments.length === 0 ? (
        <p>Nenhum pagamento registrado.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Pedido
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Cliente
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Valor do Pedido
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Valor Pago
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Método
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Data Pagamento
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  #{p.orderId}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.customerName} (#{p.customerId})
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  R$ {p.orderAmount.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  R$ {p.totalPaid.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.method}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.status}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {p.paidAt
                    ? new Date(p.paidAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentsPage;
