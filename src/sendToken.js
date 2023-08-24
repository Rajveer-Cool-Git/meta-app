import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction,  } from 'wagmi';
import { erc20ABI } from 'wagmi';
import { useDebounce } from 'use-debounce';
import './App.css';


function SendToken() {
  const BNBT_CONTRACT_ADDRESS = '0xE4B361431E2E194B38833004A6b72e3Ab3479aaE'; // Replace with the BNBT contract address
  //const RECIPIENT_ADDRESS = '0x038aC7727A8dC0F9AC4983A69e8554d06E31Ac2C'; // Replace with the recipient's address
  //const TOKEN_AMOUNT = 1000000000000000000; // Replace with the amount of tokens to send

  const [ac, setAc] = React.useState('')
  const [debouncedAc] = useDebounce(ac, 500)

  const [amount, setAmount] = React.useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config } = usePrepareContractWrite({
    address: BNBT_CONTRACT_ADDRESS,
    abi : erc20ABI,
    functionName: 'transfer',
    args: [debouncedAc, debouncedAmount],
    enabled: true,

  });


  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });
  const handleClick = () => {
    write?.();
  };
  
  return (
  
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleClick()
      }}>
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
                placeholder="0.05"
                value={amount} />
            </div>
      <div>
      <button disabled={isLoading || !write || !ac || !amount} className='paybtn'>
        {isLoading ? 'Processing...' : 'Pay '}
      </button>
      </div>

      {isSuccess && (
        <div>
          Successfully sent <div className='ac-coin'>{amount}</div> coins to <div className='ac-add'>{ac}</div>
        </div>)}

    </form>


      {/* <button onClick={handleClick} disabled={!write || isLoading}> Submit All Amount </button> */}
    </div>



  );
}

export default SendToken;
