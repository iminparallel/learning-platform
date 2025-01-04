"use client";
import Login from "@/components/login-button";
import { useSession, signIn, signOut } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const style_hover = {
  position: "absolute",
  top: 20,
  right: 100,
  fontt: 400,
  textAlign: "center",
  marginTop: "10px",
  marginLeft: "50px",
  color: "green",
};

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav>
      <div style={style_hover}>Milestone</div>
      <Login />
      {session ? <ConnectButton /> : <></>}
    </nav>
  );
}
