import React, { useState } from 'react';
import Web3 from 'web3';

const WalletConnect = ({ setAccount }) => {
  const [localAccount, setLocalAccount] = useState(null);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Solicitar permiso para acceder a las cuentas del usuario
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Obtener las cuentas disponibles
        const accounts = await web3.eth.getAccounts();
        
        // Establecer la cuenta en el estado local y en el estado del componente padre
        setLocalAccount(accounts[0]);
        setAccount(accounts[0]);
      } catch (error) {
        // Manejo de errores
        setError("Failed to connect wallet. Please try again.");
        console.error("Connection failed", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {localAccount && <p>Connected account: {localAccount}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default WalletConnect;

