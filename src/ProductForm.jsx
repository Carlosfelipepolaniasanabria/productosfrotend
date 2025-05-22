import { useState } from "react";
import "./ProductForm.css";

function ProductForm({ onNewProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProduct = { name, price };

    // Enviar al servidor (suponiendo que tu API está en localhost:8000)
    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const savedProduct = await response.json();

    onNewProduct(savedProduct);

    setName("");
    setPrice("");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ProductForm;
