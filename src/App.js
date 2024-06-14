import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CreateOffer from './components/CreateOffer';
import OfferList from './components/OfferList';
import Transaction from './components/Transaction';

const App = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <h1>P2P Criptomonedas</h1>
      <WalletConnect setAccount={setAccount} />
      {account && <CreateOffer account={account} />}
      <OfferList onSelectOffer={setSelectedOffer} />
      {selectedOffer && <Transaction offer={selectedOffer} />}
    </div>
  );
};

export default App;
