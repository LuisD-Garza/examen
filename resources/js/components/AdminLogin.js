import Axios from 'axios';
import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  function sendForm(e) {
    event.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'El campo email es obligatorio.';
    if (!password) newErrors.password = 'El campo contraseña es obligatorio.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = {
      email,
      password,
      rememberMe,
    };

    console.log('Datos del formulario:', formData);
    Axios.post('/admin/login', formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.location.href = response.data.redirect
        } else {
          setErrors(data.errors || {});
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Login Admin</div>

            <div className="card-body">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      autoFocus
                    />
                    {errors.email && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.email}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Campo de contraseña */}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors.password}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Recordarme */}
                <div className="form-group row">
                  <div className="col-md-6 offset-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botón de enviar y enlace de "olvidé mi contraseña" */}
                <div className="form-group row mb-0">
                  <div className="col-md-8 offset-md-4">
                    <button type="submit" onClick={sendForm} className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;