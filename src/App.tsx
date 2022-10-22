import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import abi from "./utils/WavePortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const contractAddress = "0xCc1Ff671B3D4148cEE304DB4EBab2270d04437C0";
  const contractABI = abi.abi;

  const initializeAccount = async () => {
    try {
      const accounts: string[] = await window.ethereum?.request!({
        method: "eth_accounts",
      });
      accounts?.[0] && setCurrentAccount(accounts?.[0]);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const connectWallet = async () => {
    try {
      const accounts: string[] = await window.ethereum?.request!({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts?.[0]);
      accounts?.[0] && setCurrentAccount(accounts?.[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const wave = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        );
        let count = await wavePortalContract.getTotalWaves();
        console.log("Before: Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("After: Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initializeAccount();
  }, []);

  useEffect(() => {
    console.log("account", currentAccount);
  }, [currentAccount]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am farza and I worked on self-driving cars so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {currentAccount ? (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : null}
      </div>
    </div>
  );
}
