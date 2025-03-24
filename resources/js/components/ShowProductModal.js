import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShowProductModal = ({ producto, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria_id: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria_id: producto.categoria_id,
      });
      setTitle('Detalles del Producto');
    }

    fetchCategorias();
  }, [producto]);

  // Obtener las categorías desde el backend
  const fetchCategorias = async () => {
    try {
      const response = await axios.get('/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button onClick={onClose}>x</button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  name="categoria_id"
                  value={formData.categoria_id}
                  className="form-control"
                  disabled
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProductModal;