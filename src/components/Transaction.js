import React, { useState } from 'react';

const Transaction = ({ offer }) => {
  const [received, setReceived] = useState(false);

  const handleReceivePayment = () => {
    setReceived(true);
    // Aquí se puede agregar la lógica para notificar al backend o blockchain
    console.log(`Payment for transaction ${offer.id} received.`);
  };

  return (
    <div>
      <h2>Transacción</h2>
      <p>Transacción ID: {offer.id}</p>
      <p>Cantidad de USDT: {offer.amount}</p>
      <p>Precio en ARS: {offer.price}</p>
      <button onClick={handleReceivePayment} disabled={received}>
        {received ? 'Pago recibido' : 'Marcar como recibido'}
      </button>
    </div>
  );
};

export default Transaction;
