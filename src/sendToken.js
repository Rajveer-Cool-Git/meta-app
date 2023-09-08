import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction,  } from 'wagmi';
import { erc20ABI } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { parseEther } from 'ethers';
import { useAccount } from 'wagmi'
import { useBalance } from 'wagmi'
import './App.css';


function SendToken() {
  
  const [con, setcontract] = React.useState('')
  //const [debouncedcontract] = useDebounce(con, 500)
  
  const [ac, setAc] = React.useState('')
  const [debouncedAc] = useDebounce(ac, 500)

  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const tokenValue =  !isNaN(parseFloat(debouncedAmount)) && parseFloat(debouncedAmount) > 0 ? parseEther(debouncedAmount) : undefined;

  const { config } = usePrepareContractWrite({
    address: con,
    abi : erc20ABI,
    functionName: 'transfer',
    args: [debouncedAc, tokenValue],
    enabled: true,

  });

    //to check token balance 
    const { address } = useAccount()
    const { data : tokenBal } = useBalance({
        address: address,
        token: con,
    })
   
  //to send tokens
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  const SendToken = () => {
    if (!debouncedAmount || isNaN(parseFloat(debouncedAmount))) {
      alert('Invalid amount, Please use numeric value');
    } else if (parseFloat(debouncedAmount) <= 0) {
      alert('Amount cant be zero');
    } else if (amount > (tokenBal?.formatted)) {
      alert('Insufficient amount. \nyour Balance : '+(tokenBal?.formatted));
    } else {
      write?.();
    }
    
  };

  function closeAlert(element) {
    const parentDiv = element.parentElement;
    parentDiv.style.display = 'none';
  }
  
  
  return (
    <div>

      <form onSubmit={(e) => {
        e.preventDefault()
        SendToken()
        }}>

            <div>
            <label htmlFor="acc">Contract Address : </label>
            <input
                aria-label="Contract"
                className='inputbtn'
                onChange={(e) => setcontract(e.target.value)}
                placeholder="Contract Address"
                value={con} />
            </div>
            
            <div>
            <label htmlFor="acc">Account no : </label>
            <input
                aria-label="Recipient"
                className='inputbtn'
                onChange={(e) => setAc(e.target.value)}
                placeholder="0xA0C............."
                value={ac} />
            </div>

            <div>
            <label htmlFor="amt">Amount  : </label>
            <input
                aria-label="Amount (ether)"
                className='inputbtn'
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1"
                value={amount} />
            </div>

            <div>
            <button disabled={isLoading } className='paybtn'>
              {isLoading ? 'Processing...' : 'Pay '}
            </button>
            </div>
   
        {isSuccess &&  (
        <div class="alert">
            Successfully sent <div className='ac-coin'>{amount}</div> Tokens to <div className='ac-add'>{ac}</div>
            <span className="closebtn" onClick={(e) => closeAlert(e.target)}>&times;</span> 
        </div>
        )}

      

      </form>
    </div>



  );
}

export default SendToken;
