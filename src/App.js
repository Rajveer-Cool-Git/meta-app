import './App.css';

import MetaApp from './wallet';
import { mainnet, polygon, optimism, arbitrum, bscTestnet, bsc, telos } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { LoginApp } from './logincheck';
//import NetworkSwitcher from './bal';



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

function App() {

  

  return (
    <div className="App">

        <header className="App-header">
          Meta App
        </header>

        <div className="app-body">
          <MetaApp />
        </div>

        <WagmiConfig config={config}>
        <LoginApp />
        </WagmiConfig>
      
       
    </div>
  );
}

export default App;
