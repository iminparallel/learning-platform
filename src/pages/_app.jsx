import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
//import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
//import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";

import { config } from "../wagmi";

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <SessionProvider session={session}>
          {/* <RainbowKitSiweNextAuthProvider> */}
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
          {/* </RainbowKitSiweNextAuthProvider> */}
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
