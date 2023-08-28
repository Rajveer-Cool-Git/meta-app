// import { useAccount } from 'wagmi'
// import { useBalance } from 'wagmi'

// function Balance() {
//     const { address, isConnecting, isDisconnected } = useAccount()
//     const { data, isError, isLoading } = useBalance({
//         address: address,
//         token: '0xE4B361431E2E194B38833004A6b72e3Ab3479aaE',
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


//   import { useBalance } from 'wagmi'



//   function Balance() {
//     const balance = useBalance({
//       address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
//       token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
//     })
  

//     return <div>Token: {decimals?.formatted}{data?.symbol}</div>
//   }
  
//  export default Balance;