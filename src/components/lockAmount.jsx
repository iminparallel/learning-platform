"use client";
import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useChainId,
  getSigner,
  useProvider,
} from "wagmi";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";

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
      //args: [ethers.parseEther(inputValue.toString())],
      //overrides: {
      //   value: ethers.parseEther(inputValue.toString()),
      //nonce: 1,
      //},
    });
    //const provider = new ethers.BrowserProvider(window.ethereum);
    //const signer = provider.getSigner();
    //const { provider } = useProvider();
    //const signer = provider.getSigner(address);
    //const { signer } = getSigner();

    // Convert amount to Wei
    //const valueInWei = ethers.parseEther(inputValue.toString());

    // Create contract instance
    /* const contract = new ethers.Contract(
      mileStonesAddress, // Replace with your contract address
      abi,
      signer
    ); */

    // Call lockFunds function with value
    //const tx = await contract.lockFunds({ value: valueInWei });
    //console.log("Transaction sent:", tx);

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
      <p style={{ marginTop: "40px", color: "green" }}>Lock Amount</p>
      {mileStonesAddress}
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
