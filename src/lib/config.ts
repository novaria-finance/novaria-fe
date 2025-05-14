import { createConfig, http } from "wagmi"
import { type Chain } from "viem"

export const baseSepolia = {
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://sepolia.base.org"] },
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia-explorer.base.org",
    },
  },
} as const satisfies Chain

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})
