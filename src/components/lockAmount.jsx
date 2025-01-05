"use client";
import { useState } from "react";
import { useAccount, useWriteContract, useChainId } from "wagmi";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import { config } from "../wagmi";

export default function LockAmount() {
  const { address, isConnected } = useAccount();
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const chainId = useChainId();
  const mileStonesAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const handleClick = async () => {
    if (!/^[0-9]+$/.test(inputValue) || Number(inputValue) <= 100) {
      setErrorMessage("Please enter a numeric value greater than 100.");
      setResponseMessage("");
      setIsError(false);
      return;
    }
    writeContract({
      address: mileStonesAddress,
      abi,
      functionName: "lockFunds",
      value: ethers.parseEther(inputValue.toString()),
    });

    console.log(hash);
    setInputValue("");
    if (error) {
      setIsError(true);
      console.log(error);
    }
  };

  return loading || !mileStonesAddress ? (
    <p>...loading</p>
  ) : (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <p style={{ color: "green" }}>Lock Amount</p>
      <input
        type="text"
        disable={isPending.toString()}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter amount"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={handleClick}
        style={{ padding: "5px 15px", cursor: "pointer" }}
      >
        Lock
      </button>
      {responseMessage && (
        <p style={{ marginTop: "20px", color: "green" }}>{responseMessage}</p>
      )}
      {errorMessage && (
        <p style={{ marginTop: "20px", color: "red" }}>{errorMessage}</p>
      )}
      {isError && (
        <p style={{ marginTop: "20px", color: "red" }}>
          {" "}
          There was an error locking in, Please try again
        </p>
      )}
    </div>
  );
}
