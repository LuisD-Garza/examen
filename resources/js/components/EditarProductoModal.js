import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditarProductoModal = ({ producto, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria_id: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [title, setTitle] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria_id: producto.categoria_id,
      });
      setTitle('Editar Producto');
      setFlag(false);
    } else {
      setFlag(true);
      setTitle('Nuevo Producto');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Editar o crear nuevo producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (flag) {
      await createProducto();
    }
    else {
      await updateProducto();
    }
  };

  const createProducto = async () => {
    try {       
        const response = await axios.post(`/api/productos`, formData);
        onUpdate(response.data); 
        toast.success(response.data.message);
        onClose();
    }catch (error) {
      console.error('Error creating producto:', error);
    }
  };
  const updateProducto = async () => {  
    try {
        const response = await axios.put(`/api/productos/${producto.id}`, formData);
        onUpdate(response.data); 
        toast.success(response.data.message);
        onClose(); 
      } catch (error) {
        console.error('Error updating producto:', error);
      }
  };
  return (
    <div class="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button onClick={onClose}>x</button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label>Categoría</label>
                <select
                  name="categoria_id"
                  value={formData.categoria_id}
                  onChange={handleChange}
                  class="form-control"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" class="btn btn-primary">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProductoModal;