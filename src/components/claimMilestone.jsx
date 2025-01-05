"use client";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useChainId } from "wagmi";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import { readContract } from "@wagmi/core";
import { config } from "../wagmi";

export default function ClaimMileStone({ milestones }) {
  const [isLockedIn, setIsLockedIn] = useState(false);
  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const chainId = useChainId();
  const mileStonesAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [claimable, setClaimable] = useState(true);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    async function getUserDetails() {
      try {
        console.log("Either session or address has changed.");
        const result = await readContract(config, {
          abi,
          address: mileStonesAddress,
          functionName: "getUserDetails",
          args: [address],
        });
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
      }
    }
    getUserDetails();
  }, [address]);

  const handleClick = async () => {
    writeContract({
      address: mileStonesAddress,
      abi,
      functionName: "completeMilestone",
    });
    console.log(hash);
    if (!error) {
      setClaimable(false);
    }
    console.log("claimd a milestone");
  };
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      {claimable && isLockedIn ? (
        mileStonesAddress ? (
          <button
            onClick={handleClick}
            style={{ padding: "5px 15px", cursor: "pointer" }}
          >
            Claim MileStone
          </button>
        ) : (
          <p> Contract is not deployed on this chain </p>
        )
      ) : (
        <p>
          You can't claim this Milestone again! <br /> Please Lock in, or try a
          different Milestone, or a different Chain!{" "}
        </p>
      )}
    </div>
  );
}
