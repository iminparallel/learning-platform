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
  color: "blue",
};

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav>
      <div style={style_hover}>Learnable</div>
      <Login />
      {session ? <ConnectButton /> : <></>}
    </nav>
  );
}
