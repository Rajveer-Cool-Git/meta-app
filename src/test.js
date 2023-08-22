import { ethers } from 'ethers';


export function CTest() {
// Try to import a provider class
let providerAvailable = false;
try {
  const JsonRpcProvider = ethers.providers.JsonRpcProvider;
  if (JsonRpcProvider) {
    providerAvailable = true;
  }
} catch (error) {
  // Provider class is not available
  providerAvailable = false;
}

// Check if the provider is available
if (providerAvailable) {
  console.log('JsonRpcProvider is available in ethers.');
} else {
  console.log('JsonRpcProvider is not available in ethers.');
}
}