import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowProductModal from './ShowProductModal'; // Importar el modal
import CartModal from './CartModal'; // Importar el modal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null); // Producto seleccionado para ver detalles
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [showCartModal, setShowCartModal] = useState(false); // Estado para controlar la visibilidad del modal del carrito

  // Obtener la lista de productos
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('/api/productos');
      setProductos(response.data.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    if (productoEnCarrito) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    toast.success('Producto agregado al carrito');
  };

  // Ver detalle del producto
  const verDetalle = (producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducto(null);
  };

  // Cerrar el modal del carrito
  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Lista de Productos</h1>
        <button className="btn btn-primary" onClick={() => setShowCartModal(true)}>
          <FontAwesomeIcon icon={faShoppingCart} /> Ver Carrito ({carrito.length})
        </button>
      </div>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-3 mb-4" key={producto.id}>
            <div className="card h-100">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al Carrito
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => verDetalle(producto)}
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      {showModal && (
        <ShowProductModal
          producto={selectedProducto}
          onClose={handleCloseModal}
        />
      )}
      {showCartModal && (
        <CartModal
          carrito={carrito}
          onClose={handleCloseCartModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;