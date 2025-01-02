import { ConnectButton } from "@rainbow-me/rainbowkit";
//import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/login-button";
import Outro from "../components/outro";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> App</title>
        <meta content="by Harit Chowdhury" name="home" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className={styles.NavBar}>
        <NavBar />
      </div>

      <main className={styles.main}>
        <Outro />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}
