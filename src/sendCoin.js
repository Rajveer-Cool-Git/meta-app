import * as React from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'ethers';
import { useAccount } from 'wagmi'
import { useBalance } from 'wagmi'
import './App.css';



export function SendTransaction() {
  //to take Address and Amount
  const [to, setTo] = React.useState('')
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  //to make transaction
  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
    value: !isNaN(parseFloat(debouncedAmount)) && parseFloat(debouncedAmount) > 0 ? parseEther(debouncedAmount) : undefined,
  })

  const { data, sendTransaction,   } = useSendTransaction(config)
  const { isLoading, isSuccess,  } = useWaitForTransaction({
    hash: data?.hash })

  //to check coin balance
  const { address } = useAccount()
  const { data: AcBal} = useBalance({
        address: address,       //using AcBal to check coin
  })

    //transaction handling
    const handleTransaction = () => {
      if (!debouncedAmount || isNaN(parseFloat(debouncedAmount))) {
        alert('Invalid amount, Please use numeric value');
      } else if (parseFloat(debouncedAmount) <= 0) {
        alert('Amount cant be zero');
      } else if (amount > (AcBal?.formatted)) {
        alert('Insufficient amount av');
      } else {
        if(
        sendTransaction?.() ){
          alert('Transaction Successful.');
        }else{
          alert('Transaction failed or rejected');
        }
      }
    };

    
    function closeAlert(element) {
      const parentDiv = element.parentElement;
      parentDiv.style.display = 'none';
    }


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
      <button disabled={isLoading } className='paybtn'>
        {isLoading ? 'Processing...' : 'Pay '}
      </button>
      </div>

      {isSuccess &&  (
      <div class="alert">
          Successfully sent <div className='ac-coin'>{amount}</div> Tokens to <div className='ac-add'>{to}</div>
          <span className="closebtn" onClick={(e) => closeAlert(e.target)}>&times;</span> 
      </div>
      )}

    </form>
  )
}
