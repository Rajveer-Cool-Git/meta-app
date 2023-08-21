
import './App.css';
import React, { useState } from 'react';
import { mainnet, optimism, polygon, arbitrum, bscTestnet, bsc, telos } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";


const chains = [mainnet, polygon, optimism, arbitrum, bscTestnet, bsc, telos];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    appName: "Pay App",
    chains,
    options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  

}),
);


const MetaApp = () => {

    const [isOn, setIsOn] = useState(false);
    const toggleHandler = () => {
          setIsOn(!isOn);
    };

    
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme={isOn ? 'midnight' : 'auto'}>

        <div className='meta-back'>
        <label className="switch">
        <input type="checkbox" checked={isOn} onChange={toggleHandler} />
        <span className="slider round"></span>
        </label>


          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => {
           
              return (
                <button onClick={show} className="styled-button">
                  {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
                </button>
              );
            }}
          </ConnectKitButton.Custom>

        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};


export default MetaApp;


