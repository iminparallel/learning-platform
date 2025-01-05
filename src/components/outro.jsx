"use client";
import Description from "@/components/descriptions";
import { useSession, signIn } from "next-auth/react";
import YouTubePlayer from "@/components/youtubePlayer";
import { useRouter } from "next/navigation";
import { useAccount, useChainId } from "wagmi";
import { useState, useEffect } from "react";
import LockAmount from "@/components/lockAmount";
import { readContract } from "@wagmi/core";
import { abi, contractAddresses } from "../constants";
import { config } from "../wagmi";
import { getBalance } from "@wagmi/core";
//Outro Course Component: Let's watch videos take tests and lock ammount
export default function Outro() {
  const [isLockedIn, setIsLockedIn] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [mileStones, setMileStones] = useState(1);
  const [balance, setBalance] = useState("");
  const chainId = useChainId();
  const mileStonesAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const proj = "saladFinger";
  const router = useRouter();
  const contractBalance = async () => {
    // Get Contract Balance
    const contractBalance = await getBalance(config, {
      address: mileStonesAddress,
    });
    setBalance(contractBalance.formatted.toString());

    console.log(contractBalance.value);
  };

  const startTest = (assignment) => {
    // Start Test
    const project = "saladFinger";
    router.push(
      `/test?project=${project}&assignment=${assignment}&milestones=${mileStones}`
    );
  };
  useEffect(() => {
    //Periodically update states depending on next-auth, wallet window, and chainId
    async function getUserDetails() {
      try {
        console.log("Either session or address has changed.");
        const result = await readContract(config, {
          abi,
          address: mileStonesAddress,
          functionName: "getUserDetails",
          args: [address],
        });
        setMileStones(result.milestoneCompleted.toString());
        try {
          if (result.totalAmount.toString() > 0) {
            setIsLockedIn(true);
          } else {
            setIsLockedIn(false);
          }
        } catch {
          setIsLockedIn(false);
        }
        console.log(result);
        console.log(isLockedIn);
      } catch (error) {
        console.log(error);
        setMileStones("0");
      }
      setBalance("");
    }
    getUserDetails();
  }, [session, address, chainId]);
  return (
    <>
      {session ? (
        <>
          {mileStonesAddress ? (
            <div style={{ marginTop: "10px" }}>
              <p> Mile Stones Completed: {mileStones}/4</p>
              {isConnected ? (
                !isLockedIn ? (
                  <LockAmount />
                ) : (
                  <div>Already Locked IN</div>
                )
              ) : (
                <div style={{ marginTop: "20px", color: "red" }}>
                  {" "}
                  Connect Wallet to access this section{" "}
                </div>
              )}
              {balance && isConnected ? (
                <>
                  <p>Contract Address: {mileStonesAddress}</p>
                  <p style={{ marginTop: "10px" }}>
                    {" "}
                    Contract Balance: {balance}
                  </p>
                </>
              ) : (
                <></>
              )}
              {mileStonesAddress && isConnected ? (
                <button
                  onClick={contractBalance}
                  style={{ padding: "5px 15px", cursor: "pointer" }}
                >
                  balance
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <> The contract is not deployed in this chain</>
          )}
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
          <p>
            You can lock in some amount, and claim your money back by
            compleating a series of milestones!
          </p>
          <p>Sign in to see content...</p>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
          <br />
          <small>*only available in sepolia ETH and EDU Testnet</small>
        </div>
      )}
    </>
  );
}
