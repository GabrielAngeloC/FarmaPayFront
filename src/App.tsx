import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>AraujoPay Frontend</h1>

      <p>Escolha uma página:</p>

      <ul>
        <li><Link to="/customers">Clientes</Link></li>
        <li><Link to="/orders">Pedidos</Link></li>
        <li><Link to="/payments">Pagamentos</Link></li>
      </ul>
    </div>
  );
}

export default App;
