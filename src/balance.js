import { useAccount } from 'wagmi'
import { useBalance } from 'wagmi'

function Bal() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useBalance({
        address: address,
   })

    if (isConnecting) return <div>Connecting…</div>
    if (isDisconnected) return <div>Disconnected</div>

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
  return (
    <div>
    
    Balance: {data?.formatted} {data?.symbol}
    </div>
  )
}
export default Bal;