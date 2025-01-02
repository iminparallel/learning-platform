"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
const style_hover = {
  position: "absolute",
  top: 50,
  right: 100,
};
export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div
          className="relative w-full h-full aspect-square"
          style={style_hover}
        >
          {session.user.name}
          <br />
          <Image
            src={session.user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            width={50}
            height={50}
          />
        </div>
        <button onClick={() => signOut()}>
          Sign Out <br />
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
