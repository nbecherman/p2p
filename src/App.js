import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CreateOffer from './components/CreateOffer';
import OfferList from './components/OfferList';
import Transaction from './components/Transaction';

const App = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [account, setAccount] = useState(null);
  const [offers, setOffers] = useState([]);

  const addOffer = (offer) => {
    setOffers([...offers, offer]);
  };

  return (
    <div className="App">
      <h1>P2P Criptomonedas</h1>
      <WalletConnect setAccount={setAccount} />
      {account && <CreateOffer account={account} addOffer={addOffer} />}
      <OfferList offers={offers} onSelectOffer={setSelectedOffer} />
      {selectedOffer && <Transaction offer={selectedOffer} />}
    </div>
  );
};

export default App;

