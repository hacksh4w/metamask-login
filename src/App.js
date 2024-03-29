import {useState, useEffect} from 'react';
import Web3 from 'web3';

function App() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };
  
   const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        // Request account access
        const accounts = await currentProvider.request({ method: 'eth_requestAccounts' });
        const userAccount = accounts[0];
        const web3 = new Web3(currentProvider);
        console.log('Connected account:', userAccount);

        // Fetch and set the balance
        const weiBalance = await web3.eth.getBalance(userAccount);
        const etherBalance = web3.utils.fromWei(weiBalance, 'ether');
        setEthBalance(etherBalance);
        setIsConnected(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const onDisconnect = () => {
    setIsConnected(false);
  }
  
  
  
  return (
    <div className="app">
      <div className="app-header">
        <h1>React dApp authentication with React, We3.js and Metamask</h1>
      </div>
      <div className="app-wrapper">
        {!isConnected && (
          <div>
            <button className="app-button__login" onClick={onConnect}>
            Login
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="app-wrapper">
          <div className="app-details">
            <h2> You are connected to metamask.</h2>
            <div className="app-balance">
              <span>Balance: </span>
              {ethBalance}
            </div>
          </div>
          <div>
            <button className="app-buttons__logout" onClick={onDisconnect}>
            Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
