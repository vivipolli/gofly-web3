import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask, coinbaseWallet, safe, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    safe()
  ]
})