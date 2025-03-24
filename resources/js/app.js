import React from 'react';
import ReactDOM from 'react-dom';
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import ProductosList from './components/ProductosList';
import Register from './components/Register';
import ProductoForm from './components/ProductoForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

if (document.getElementById('admin-login')) {
  ReactDOM.render(<AdminLogin />, document.getElementById('admin-login'));
}

if (document.getElementById('login')) {
  ReactDOM.render(<Login />, document.getElementById('login'));
}

if (document.getElementById('register')) {
  ReactDOM.render(<Register />, document.getElementById('register'));
}

if (document.getElementById('user-dashboard')) {
  ReactDOM.render(<UserDashboard />, document.getElementById('user-dashboard'));
}

if (document.getElementById('admin-dashboard')) {
  ReactDOM.render(<ProductosList />, document.getElementById('admin-dashboard'));
}
