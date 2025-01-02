"use client";
import Description from "@/components/descriptions";
import { useSession, signIn } from "next-auth/react";
import YouTubePlayer from "@/components/youtubePlayer";
import { useRouter } from "next/navigation";

export default function Outro() {
  const { data: session } = useSession();
  let email = "";
  //const email = session.user.name;
  const router = useRouter();
  console.log(JSON.stringify(session));
  if (session) {
    email = session.user.email;
  }
  const startTest = () => {
    const project = "saladFinger";
    const assignment = "01";
    router.push(
      `/test?project=${project}&assignment=${assignment}&email=${email}`
    );
  };

  return (
    <>
      {session ? (
        <>
          <YouTubePlayer videoId="OWBFKL6H7rI" taskId="1" />
          <br />
          <button
            onClick={startTest}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Assignment 1
          </button>
        </>
      ) : (
        <div>
          <br />
          Please Login to see content <br />
          <button onClick={() => signIn()}>Sign in</button>
          <br />
        </div>
      )}
    </>
  );
}
