import * as React from 'react'

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'use-debounce';
import { erc20ABI } from 'wagmi';
import './App.css';

export function MintNFTForm() {
    const [to, setTo] = React.useState('')
    const [debouncedTo] = useDebounce(to, 500)

  const [tokenId, setTokenId] = React.useState('')
  const debouncedTokenId = useDebounce(tokenId)

  const { config, error: prepareError, isError: isPrepareError} = usePrepareContractWrite({
    address: debouncedTo,
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'payable',
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
    <form onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }} >
        <div>
            <label htmlFor="acc">Account no : </label>
            <input
                aria-label="Recipient"
                className='inputbtn'
                onChange={(e) => setTo(e.target.value)}
                placeholder="0xA0C............."
                value={to} />
        </div>
        <div>
            <label for="tokenId">Token ID</label>
            <input
                className='inputbtn'
                id="tokenId"
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="420"
                value={tokenId}
            />
        </div>

      <button disabled={!write || isLoading} className='paybtn'>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
  )
}

