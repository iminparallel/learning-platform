"use client";
import { useState } from "react";
import { useAccount, useWriteContract, useChainId } from "wagmi";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";

export default function ClaimMileStone() {
  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const chainId = useChainId();
  const mileStonesAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const handleClick = async () => {
    writeContract({
      address: mileStonesAddress,
      abi,
      functionName: "completeMilestone",
    });
    console.log(hash);
    console.log("claim milestones");
  };
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <button
        onClick={handleClick}
        style={{ padding: "5px 15px", cursor: "pointer" }}
      >
        Claim MileStone
      </button>
    </div>
  );
}
