import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction,  } from 'wagmi';
import { erc20ABI } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { parseEther } from 'ethers';
import './App.css';


function SendToken() {
  //const BNBT_CONTRACT_ADDRESS = '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06'; // Replace with the BNBT contract address
  
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


  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });
  const handleClick = () => {
    write?.();
  };

  function closeAlert(element) {
    const parentDiv = element.parentElement;
    parentDiv.style.display = 'none';
  }
  
  
  return (
    
  
    <div>

      <form onSubmit={(e) => {
        e.preventDefault()
        handleClick()
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
      <button disabled={isLoading || !write || !ac } className='paybtn'>
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
