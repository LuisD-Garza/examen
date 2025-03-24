import React from 'react';

const CartModal = ({ carrito, onClose }) => {
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Carrito de Compras</h5>
            <button onClick={onClose}>x</button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.nombre} - ${item.precio} x {item.cantidad}
                  <span className="badge badge-primary badge-pill">${item.precio * item.cantidad}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <h5>Total: ${calcularTotal()}</h5>
            </div>
            <button type="button" className="btn btn-secondary mt-3" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;