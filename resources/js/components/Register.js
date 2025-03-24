import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Estado para manejar errores
  const [errors, setErrors] = useState({});

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendForm = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend
      const response = await axios.post('/register', formData);

      // Si el registro es exitoso, redirigir al usuario
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.href = '/login'; // Redirigir al login
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Mostrar errores de validación
        setErrors(error.response.data.errors);
      } else {
        console.error('Error:', error);
      }
    }
  }
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Campo para el nombre */}
                <div className="form-group row">
                  <label htmlFor="name" className="col-md-4 col-form-label text-md-right">
                    Name
                  </label>
                  <div className="col-md-6">
                    <input
                      id="name"
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      autoFocus
                    />
                    {errors.name && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.name[0]}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Campo para el email */}
                <div className="form-group row">
                  <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                    E-Mail Address
                  </label>
                  <div className="col-md-6">
                    <input
                      id="email"
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.email[0]}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Campo para la contraseña */}
                <div className="form-group row">
                  <label htmlFor="password" className="col-md-4 col-form-label text-md-right">
                    Password
                  </label>
                  <div className="col-md-6">
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.password[0]}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Campo para confirmar la contraseña */}
                <div className="form-group row">
                  <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">
                    Confirm Password
                  </label>
                  <div className="col-md-6">
                    <input
                      id="password-confirm"
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {/* Botón de registro */}
                <div className="form-group row mb-0">
                  <div className="col-md-6 offset-md-4">
                    <button onClick={sendForm} className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer />
    </div>
  );
};

export default Register;