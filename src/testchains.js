export const eduTestnetChain = {
  id: 41923, // Replace with the actual chain ID for the EDU testnet
  name: "EDU Testnet",
  network: "edu-testnet",
  nativeCurrency: {
    name: "EDU Coin",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.edu-chain.raas.gelato.cloud"], // Replace with the actual RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: "EDU Explorer",
      url: "https://educhain.blockscout.com/", // Replace with the actual block explorer URL
    },
  },
  testnet: true, // Indicates this is a testnet
};
