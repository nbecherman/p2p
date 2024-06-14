import React, { useState } from 'react';

const CreateOffer = ({ account }) => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [cvu, setCvu] = useState('');
  const [alias, setAlias] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const offer = {
      amount,
      price,
      sellerWalletAddress: account,
      cvu,
      alias,
    };
    console.log('Offer created:', offer);
    // Aquí se puede agregar la lógica para enviar la oferta al backend o blockchain
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cantidad de USDT:</label>
        <input
          type="number"
          placeholder="Cantidad de USDT"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio en ARS por USDT:</label>
        <input
          type="number"
          placeholder="Precio en ARS"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CVU de Mercado Pago:</label>
        <input
          type="text"
          placeholder="CVU de Mercado Pago"
          value={cvu}
          onChange={(e) => setCvu(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Alias de Mercado Pago:</label>
        <input
          type="text"
          placeholder="Alias de Mercado Pago"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Oferta</button>
    </form>
  );
};

export default CreateOffer;
