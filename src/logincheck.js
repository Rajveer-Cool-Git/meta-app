import { useAccount } from 'wagmi'
import React, { useState } from 'react';
import './App.css';

import { mainnet, polygon, optimism, arbitrum, bscTestnet, bsc, telos } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { SendTransaction } from './sendCoin'
import SendToken from './sendToken';
//import Balance from './Balance';
import SwitchNet from './networkChain';






const chains = [mainnet, polygon, optimism, arbitrum, bscTestnet, bsc, telos];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys here
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    appName: "Your App Name",
    chains,
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  

}),
);


export function LoginApp() {
  const { isConnected } = useAccount();

  const [selectedOption, setSelectedOption] = useState(''); 

  if (isConnected) {
    return (
     <WagmiConfig config={config}>
      <div>

       
        <SwitchNet/>  <br   />
        
        <div className='box'>
        
        <select id="selectInput" onChange={(e) => setSelectedOption(e.target.value)}>
          <option  value="">Choose Value</option>
          <option value="sendCoin">Send Coin</option>
          <option value="sendToken">Send Token</option>
        
        </select><br />
      </div>
          {selectedOption === 'sendCoin' && <SendTransaction />}
          {selectedOption === 'sendToken' && <SendToken />}
        
  
      </div>
      </WagmiConfig>
    )
  }

  return <div>{/* Connect wallet content goes here */}</div>
}
