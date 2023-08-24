import { useNetwork, useSwitchNetwork } from 'wagmi';
import './App.css';

function SwitchNet() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  const handleNetworkChange = (event) => {
    const selectedChainId = parseInt(event.target.value, 10);
    switchNetwork?.(selectedChainId);
  };

  return (
    <>

      {chain && <div>Connected to {chain.name}</div>}
      <div className='box'>
      <select className="switchSelect" onChange={handleNetworkChange}>
        {chains.map((x) => (
          <option
            key={x.id}
            value={x.id}
            disabled={!switchNetwork || x.id === chain?.id}
          >
            {x.name}
            {isLoading && pendingChainId === x.id && ' (switching)'}
          </option>
        ))}
      </select>
      </div>
      <div>{error && error.message}</div>
    </>
  );
}

export default SwitchNet;


// import { useNetwork, useSwitchNetwork } from 'wagmi'
// import './App.css';

// function SwitchNet() {
//   const { chain } = useNetwork()
//   const { chains, error, isLoading, pendingChainId, switchNetwork } =
//     useSwitchNetwork()

//   return (
//     <>
//       {chain && <div>Connected to {chain.name}</div>}

//       {chains.map((x) => (
//         <button
//           disabled={!switchNetwork || x.id === chain?.id}
//           key={x.id}
//           onClick={() => switchNetwork?.(x.id)}
//           className='switchbtn'
//         >
//           {x.name}
//           {isLoading && pendingChainId === x.id && ' (switching)'}
//         </button>
//       ))}

//       <div>{error && error.message}</div>
//     </>
//   )
// }
//  export default SwitchNet;