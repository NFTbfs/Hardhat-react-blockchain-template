import './App.css';

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

import GreeterArtifact from '../../artifacts/contracts/GreeterV2.sol/GreeterV2.json';
import { GreeterV2 } from '../../typechain';
import logo from './logo.svg';

function App() {
  const [message, setMessage] = useState('');
  const [version, setVersion] = useState('');
  const [inputGreeting, setInputGreeting] = useState('');
  const [greeter, setGreeter] = useState<GreeterV2>();

  useEffect(() => {
    const doAsync = async () => {
      // initialize wallet connection
      const web3Modal = new Web3Modal({ providerOptions: {} });
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      setGreeter(
        new ethers.Contract(
          // TODO: get from .env
          '0x5fbdb2315678afecb367f032d93f642f64180aa3',
          GreeterArtifact.abi,
          signer
        ) as GreeterV2
      );
    };
    doAsync();
  }, []);

  useEffect(() => {
    const doAsync = async () => {
      if (!(greeter && (await greeter.deployed()))) return;
      console.log('Greeter is deployed at ', greeter.address);
      setMessage(await greeter.greet());
      setVersion(await greeter.version());
    };
    doAsync();
  }, [greeter]);

  const handleSetGreeting = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!(greeter && (await greeter.deployed())))
      throw Error('Greeter not ready');
    const tx = await greeter.setGreeting(inputGreeting);
    console.log('setGreeting tx', tx);
    await tx.wait();
    const _message = await greeter.greet();
    console.log('New greeting mined, result: ', _message);
    setMessage(_message);
    setInputGreeting('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <p>v{version}</p>
        <input
          value={inputGreeting}
          onChange={(e) => setInputGreeting(e.target.value)}
        ></input>
        <p>
          <button onClick={(e) => handleSetGreeting(e)}>Set greeting</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
