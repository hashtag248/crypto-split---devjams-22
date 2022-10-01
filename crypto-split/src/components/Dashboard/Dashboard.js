import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account, databases } from "../../appwrite/appwriteConfig";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { v4 as uuidv4 } from "uuid";
import { Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { etherActions } from "../../store/ether-slice";


function Dashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [userEthData, setUserEthData] = useState({});
  const successMessage = useSelector((state) => state.ui.successMessage);
  const failureMessage = useSelector((state) => state.ui.failureMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [etherData, setEtherData] = useState({
  //   publicKey: "",
  //   etherBalance: 0,
  // });
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const data = await account.get();
      // console.log(data);
      setUserDetails(data);
    };
    try {
      getData();
    } catch (e) {
      dispatch(uiActions.setFailureToast({ message: e.message }));
      dispatch(uiActions.showFailureToast());
    }
  }, []);

  const getBalance = async (account) => {
    console.log(account);
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });
    return balance;
  };

  const connectWalletHandler = async () => {
    // const accounts = window.ethereum
    //   .request({
    //     method: "wallet_requestPermissions",
    //     params: [
    //       {
    //         eth_accounts: {},
    //       },
    //     ],
    //   })
    //   .then(() =>
    //     window.ethereum
    //       .request({
    //         method: "eth_requestAccounts",
    //       })
    //       .then((response) => {
    //         console.log(response[0]);
    //         const account = response[0];
    //         setPublicKey(account);
    //         getBalance(account);
    //         console.log(balance);
    //         const ethBal = ethers.utils.formatEther(balance);
    //         setBalance(ethBal);
    //       })
    //   );
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts[0]);
    const balance = await getBalance(accounts[0]);
    console.log(balance);
    setPublicKey(accounts[0]);
    setBalance(ethers.utils.formatEther(balance));
    try {
      const user = await account.get();
      const id = uuidv4();
      // dispatch(
      //   etherActions.setTokens({
      //     accounts[0],
      //     ethers.utils.formatEther(balance),
      //     name: user.name,
      //     email: user.email,
      //     id,
      //   })
      // );
      const response = await databases.createDocument(
        "63371d8a882b81c0e738",
        "63387fc0c77bb503a340",
        id,
        {
          publicKey: accounts[0],
          balance: ethers.utils.formatEther(balance),
          email: user.email,
          name: user.name,
        }
      );
      console.log(response);
      dispatch(
        uiActions.setSuccessToast({ message: "Wallet connected successfully!" })
      );
      dispatch(uiActions.showSuccessToast());
    } catch (e) {
      console.log(e);
    }
  };

  const disconnectWallet = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [{ eth_accounts: {} }],
    });
    window.location.reload();
  };

  return (
    <>
      <div>
        <p>
          Welcome, <b>{userDetails.name}</b>{" "}
        </p>
        {!userDetails.publicKey && (
          <Button variant="contained" onClick={connectWalletHandler}>
            Connect Wallet
          </Button>
        )}
      </div>
      <br></br>
      <Typography variant="h4">
        Public Key: <b>{publicKey}</b>
      </Typography>
      <Typography variant="h5">
        Balance: <b>{balance}</b>
      </Typography>
      <Button
        sx={{ marginTop: "" }}
        variant="contained"
        onClick={disconnectWallet}
      >
        Disconnect Wallet
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <Link to="/interact">
          <Typography variant="h5">Interact with others</Typography>
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
