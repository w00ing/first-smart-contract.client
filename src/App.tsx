import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import { useMetaMask } from "./hooks/useMetaMask";

const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//    try {
//      const ethereum = getEthereumObject();
//      if(!ethereum) {
//       console.log("Make sure you have metamask!")
//       return null;
//      }
//      console.log("We have the ethereum object", ethereum);
//      const accounts = await ethereum.request({ method: "eth_accounts" })
//      if(accounts.length !== 0) {
//        const account = accounts[0];
//        console.log("Found an authorized account:", account)
//        return account;
//      } else {
//        console.error("No authorized account found");
//        return null;
//      }
//    } catch(e){
//      console.error(e)
//      return null
//    }
// }

export default function App() {
  const metaMask = useMetaMask();
  const accounts = metaMask?.request({ method: "eth_accounts" });

  const wave = () => {
    console.log("WAVING");
  };

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
      </div>
    </div>
  );
}
