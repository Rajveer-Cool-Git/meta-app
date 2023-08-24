import * as React from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'ethers';
import './App.css';



export function SendTransaction() {
  const [to, setTo] = React.useState('')
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
    value: !isNaN(parseFloat(debouncedAmount)) && parseFloat(debouncedAmount) > 0 ? parseEther(debouncedAmount) : undefined,
    //value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
  })

  const { data, sendTransaction } = useSendTransaction(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash, })

    const handleTransaction = () => {
      if (!debouncedAmount || isNaN(parseFloat(debouncedAmount))) {
        alert('Invalid amount, Please use numeric value');
      } else if (parseFloat(debouncedAmount) <= 0) {
        alert('Insufficient amount');
      } else {
        
        sendTransaction?.();
       
      }
    };
    



  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        handleTransaction()
      }}>
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
            <label htmlFor="amt">Amount  : </label>
            <input
                aria-label="Amount (ether)"
                className='inputbtn'
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05"
                value={amount} />
            </div>
      <div>
      <button disabled={isLoading || !sendTransaction || !to || !amount} className='paybtn'>
        {isLoading ? 'Processing...' : 'Pay '}
      </button>
      </div>

      {isSuccess && (
        <div>
          Successfully sent <div className='ac-coin'>{amount}</div> coins to <div className='ac-add'>{to}</div>
        </div>)}

    </form>
  )
}