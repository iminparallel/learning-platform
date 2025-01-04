"use client";
import Description from "@/components/descriptions";
import { useSession, signIn } from "next-auth/react";
import YouTubePlayer from "@/components/youtubePlayer";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import LockAmount from "@/components/lockAmount";

export default function Outro() {
  const { address, isConnected } = useAccount();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [mileStones, setMileStones] = useState(1);
  const proj = "saladFinger";
  const router = useRouter();

  useEffect(() => {
    console.log("Either session or address has changed.");
  }, [session, address]);

  const startTest = (assignment) => {
    const project = "saladFinger";
    router.push(
      `/test?project=${project}&assignment=${assignment}&milestones=${mileStones}`
    );
  };

  return (
    <>
      {session ? (
        <>
          <LockAmount />
          <YouTubePlayer videoId="OWBFKL6H7rI" taskId="1" />
          <br />
          <button
            onClick={() => startTest("01")}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Spoons
          </button>
          <br />
          <YouTubePlayer videoId="cuCw5k-Lph0" taskId="2" />
          <br />
          <button
            onClick={() => startTest("02")}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Friends
          </button>
          <br />
          <YouTubePlayer videoId="ojoICRzSCOo" taskId="3" />
          <br />
          <button
            onClick={() => startTest("03")}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Nettles
          </button>
          <br />
          <YouTubePlayer videoId="tBNrtrntkJ4" taskId="4" />
          <br />
          <button
            onClick={() => startTest("04")}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            cage
          </button>
          <br />
          <Description />
          <br />
        </>
      ) : (
        <div>
          <br />
          Please Login to see content <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
}
