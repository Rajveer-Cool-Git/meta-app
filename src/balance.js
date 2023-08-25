// import { useAccount } from 'wagmi'
// import { useBalance } from 'wagmi'

// function Balance() {
//     const { address, isConnecting, isDisconnected } = useAccount()
//     const { data, isError, isLoading } = useBalance({
//         address: address,
//    })

//     if (isConnecting) return <div>Connecting…</div>
//     if (isDisconnected) return <div>Disconnected</div>

//     if (isLoading) return <div>Fetching balance…</div>
//     if (isError) return <div>Error fetching balance</div>
//   return (
//     <div>
//     Balance: {data?.formatted} {data?.symbol}
//     </div>
//   )
// }
// export default Balance;


// import { useContractRead } from 'wagmi'
// import { erc20ABI } from 'wagmi';
// 
  import { useToken } from 'wagmi'

  function Balance() {
    const { data, decimals, isError, isLoading } = useToken({
      address: '',
    })
  
    if (isLoading) return <div>Fetching token…</div>
    if (isError) return <div>Error fetching token</div>
    return <div>Token: {decimals?.formatted}{data?.symbol}</div>
  }
  
 export default Balance;