import React from 'react';

const OfferList = ({ offers, onSelectOffer }) => {
  return (
    <div>
      <h2>Ofertas Disponibles</h2>
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            {offer.amount} USDT por {offer.price} ARS
            <button onClick={() => onSelectOffer(offer)}>Aceptar Oferta</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferList;

