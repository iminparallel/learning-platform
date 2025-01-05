import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { hardhatChain } from "./localchain";
import { eduTestnetChain } from "./testchains";
export const config = getDefaultConfig({
  appName: "Milestone App",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [sepolia, eduTestnetChain]
      : []),
  ],
  ssr: true,
});
