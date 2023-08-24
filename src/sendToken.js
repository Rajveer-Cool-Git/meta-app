import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, writeContract  } from 'wagmi';
import { erc20ABI } from 'wagmi';


function SendToken() {
  const BNBT_CONTRACT_ADDRESS = '0xE4B361431E2E194B38833004A6b72e3Ab3479aaE'; // Replace with the BNBT contract address
  const RECIPIENT_ADDRESS = '0x038aC7727A8dC0F9AC4983A69e8554d06E31Ac2C'; // Replace with the recipient's address
  const TOKEN_AMOUNT = 1000000000000000000; // Replace with the amount of tokens to send

  const { config } = usePrepareContractWrite({
    address: BNBT_CONTRACT_ADDRESS,
    abi : erc20ABI,
    
    functionName: 'transfer',
    args: [RECIPIENT_ADDRESS, TOKEN_AMOUNT],
    enabled: true,

  });

  console.log('Config:', config);
  const {  data,
    write,
  } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });
  console.log('Write:', write);


  const handleClick = () => {
    console.log('Click event triggered');
    write?.();
  };
  return (
    <div>
      <button onClick={handleClick} disabled={!write || isLoading}> Submit All Amount </button>
    </div>


  );
}

export default SendToken;
