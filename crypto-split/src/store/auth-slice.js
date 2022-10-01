import { createSlice } from "@reduxjs/toolkit";
import { account } from "../appwrite/appwriteConfig";
import { Navigate } from "react-router-dom";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    async signup(state, action) {
      try {
        const email = action.payload.email;
        const name = action.payload.name;
        const id = action.payload.id;
        const password = action.payload.password;

        const response = await account.create(id, email, password, name);
        await account.createEmailSession(email, password);
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async login(state, action) {
      try {
        const email = action.payload.email;
        const password = action.payload.password;
        //   console.log(email);

        const response = await account.createEmailSession(email, password);
        // const newState = { user: response };
        console.log(response);
        <Navigate replace to="/dashboard" />;
        return response; // updated state for the store
      } catch (e) {
        console.log(e);
      }
    },
    async logout(state, action) {
      try {
        await account.deleteSession();
      } catch (e) {
        console.log(e);
      }
    },
    async getUser() {
      try {
        console.log(account);
        const getData = await account.get();
        console.log(getData.name);
      } catch (e) {
        console.log(e);
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
