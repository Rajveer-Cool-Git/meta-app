import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { SendTransaction } from './Transaction'
import './App.css';

import { mainnet, polygon, optimism, arbitrum, bscTestnet, bsc, telos } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";



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
  const { isConnected } = useAccount()

  if (isConnected) {
    return (
     <WagmiConfig config={config}>
      <div>
        <SendTransaction />
     
      </div>
      </WagmiConfig>
    )
  }

  return <div>{/* Connect wallet content goes here */}</div>
}
