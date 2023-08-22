import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from 'use-debounce';

export function MintNFTForm() {
  const [tokenId, setTokenId] = React.useState('')
  const debouncedTokenId = useDebounce(tokenId)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
        outputs: [],
      },
    ],
    functionName: 'mint',
    args: [parseInt(debouncedTokenId)],
    enabled: Boolean(debouncedTokenId),
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }}
    >
      <label for="tokenId">Token ID</label>
      <input
        id="tokenId"
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="420"
        value={tokenId}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
  )
}



// import React, { useState } from 'react';
// import {  useSendTransaction, useWaitForTransaction } from 'wagmi';
// import { ethers } from 'ethers';
// import { erc20ABI } from 'wagmi'

// import './App.css';



// function SendTokenTransaction() {
//   //const { account } = useAccount();
//   const [recipientAddress, setRecipientAddress] = useState('');
//   const [amount, setAmount] = useState('');


//   const tokenContractInterface = new ethers(erc20ABI); 
//   const data = tokenContractInterface.encodeFunctionData('transfer', [recipientAddress, amount]);

//   const { data: sendTransactionData, sendTransaction } = useSendTransaction({
    
//     data,
//   });

//   const { isLoading, isSuccess } = useWaitForTransaction({
//     hash: sendTransactionData?.hash,
//   });

//   const handleSendToken = () => {
//     if (recipientAddress && amount) {
//       sendTransaction();
//     } else {
//       alert('Please provide recipient address and amount.');
//     }
//   };

//   return (
//     <div>
//       <label>
//         Recipient Address:
//         <input
//           type="text"
//           value={recipientAddress}
//           onChange={(e) => setRecipientAddress(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Amount:
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={handleSendToken}>Send Token</button>
//       {isLoading && <p>Sending...</p>}
//       {isSuccess && <p>Token sent successfully!</p>}
//     </div>
//   );
// }

// export default SendTokenTransaction;
