import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    socket.on('productos_actuales', (data) => {
      setProductos(data);
    });

    socket.on('nuevo_producto', (producto) => {
      setProductos(prev => [...prev, producto]);
      alert(`Nuevo producto agregado: ${producto.nombre} - $${producto.precio}`);
    });

    return () => {
      socket.off('productos_actuales');
      socket.off('nuevo_producto');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/products', {
        nombre,
        precio
      });
      setNombre('');
      setPrecio('');
    } catch (error) {
      console.error('Error al agregar producto', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <h3>Productos:</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} - ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;



