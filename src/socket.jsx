import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    socket.on("newProduct", (product) => {
      setProducts((prev) => [...prev, product]);
    });


    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
