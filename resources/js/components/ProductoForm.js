import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const ProductoForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    img: '',
    categoria_id: '',
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
    if (id) {
      fetchProducto();
    }
  }, [id]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    }
  };

  const fetchProducto = async () => {
    try {
      const response = await axios.get(`/api/productos/${id}`);
      setProducto(response.data);
    } catch (error) {
      console.error('Error fetching producto:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/productos/${id}`, producto);
      } else {
        await axios.post('/api/productos', producto);
      }
      history.push('/admin/productos');
    } catch (error) {
      console.error('Error saving producto:', error);
    }
  };

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>{id ? 'Editar Producto' : 'Crear Producto'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            value={producto.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select
            name="categoria_id"
            className="form-control"
            value={producto.categoria_id}
            onChange={handleChange}
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
        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;