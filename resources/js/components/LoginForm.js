import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <div className="card p-4">
      <h2>Selecciona tu rol:</h2>
      <div className="d-flex gap-3 mt-3">
        <Link to="/login" className="btn btn-primary">
          Usuario
        </Link>
        <Link to="/admin/login" className="btn btn-danger">
          Administrador
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;