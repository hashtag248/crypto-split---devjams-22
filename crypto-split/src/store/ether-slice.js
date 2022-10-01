import { createSlice } from "@reduxjs/toolkit";
import { account } from "../appwrite/appwriteConfig";
import { databases } from "../appwrite/appwriteConfig";

const etherSlice = createSlice({
  name: "ether",
  initialState: {
    publicKey: "",
    etherBalance: "",
  },
  reducers: {
    setData(state, action) {
      return {
        ...state,
        publicKey: action.payload.publicKey,
        etherBalance: action.payload.etherBalance,
      };
    },
    async setTokens(state, action) {
      console.log("Initializing...");
      const publicKey = action.payload.publicKey;
      const balance = action.payload.balance;
      const email = action.payload.email;
      const name = action.payload.name;
      const id = action.payload.id;
      const response = await databases.createDocument(
        "63371d8a882b81c0e738",
        "63387fc0c77bb503a340",
        id,
        { publicKey: publicKey, balance: balance, email: email, name: name }
      );
      console.log("Success!");
    },
  },
});

export const etherActions = etherSlice.actions;
export default etherSlice;
