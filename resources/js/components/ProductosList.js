import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarProductoModal from './EditarProductoModal'; // Importar el modal
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null); // Producto seleccionado para editar
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [showModalN, setShowModalN] = useState(false);

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

  // Abrir el modal para editar un producto
  const handleEdit = (producto) => {
    setSelectedProducto(producto); 
    setShowModal(true); 
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalN(false); 
    setSelectedProducto(null);
  };

  // Actualizar la lista de productos   
  const handleUpdate = (updatedProducto) => {
    fetchProductos(); 
  };

  // Crear un nuevo producto
  const newProduct = () => {
    setSelectedProducto(null); 
    setShowModalN(true); 
  };

  // Eliminar un producto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/productos/${id}`);
      fetchProductos();
        toast.success('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div>
      <div className="row justify-content-between pb-3">
        <h1>Lista de Productos</h1>
        <button
          className="btn btn-primary"
          onClick={() => newProduct()}
        >
          Agregar un producto
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria.nombre}</td>
              <td>
                <button
                  className="btn btn-warning mr-3"
                  onClick={() => handleEdit(producto)} 
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(producto.id)} 
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
      {showModal && (
        <EditarProductoModal
          producto={selectedProducto}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}

      {showModalN && (
        <EditarProductoModal
          producto={selectedProducto}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductosList;