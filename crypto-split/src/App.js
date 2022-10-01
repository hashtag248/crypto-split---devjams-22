import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import { Snackbar, Alert } from "@mui/material";
import Chat from "./components/Chat/Chat";
import * as io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';


import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [
    alchemyProvider({ apiKey: "UKPqh_wm4TzJvPU_Chu73wL4W80D3NBO" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
 


const socket = io.connect("http://localhost:3001");

function App() {
  
  const dispatch = useDispatch();
  const successToast = useSelector((state) => state.ui.successToast) || false;
  const failureToast = useSelector((state) => state.ui.failureToast) || false;
  const successMessage = useSelector((state) => state.ui.successMessage);
  const failureMessage = useSelector((state) => state.ui.failureMessage);
  const handleFailureClose = () => {
    dispatch(uiActions.hideFailureToast());
  };
  const handleSuccessClose = () => {
    dispatch(uiActions.hideSuccessToast());
  };
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interact" element={<Chat />} />
      </Routes>
      <Snackbar
        open={successToast}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureToast}
        autoHideDuration={6000}
        onClose={handleFailureClose}
      >
        <Alert onClose={handleFailureClose} severity="error" sx={{ width: "100%" }}>
          {failureMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
