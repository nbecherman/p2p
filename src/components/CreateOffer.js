import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Exchange from '../../Contracts/Exchange.json';



const CreateOffer = ({ account, addOffer }) => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [cvu, setCvu] = useState('');
  const [alias, setAlias] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // Initialize web3 and contract
  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Exchange.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(
        Exchange.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contractInstance);
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        await contract.methods.createOffer(
          web3.utils.toWei(amount, 'ether'),
          web3.utils.toWei(price, 'ether'),
          cvu,
          alias
        ).send({ from: account });
        
        const offer = {
          amount,
          price,
          sellerWalletAddress: account,
          cvu,
          alias,
          id: Date.now(),
        };
        addOffer(offer);
        setAmount('');
        setPrice('');
        setCvu('');
        setAlias('');
      } catch (error) {
        console.error("Failed to create offer", error);
      }
    }
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

