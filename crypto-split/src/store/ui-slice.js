import { createSlice } from "@reduxjs/toolkit";
import { account } from "../appwrite/appwriteConfig";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    successToast: false,
    failureToast: false,
    successMessage: "",
    failureMessage: "",
  },
  reducers: {
    showSuccessToast(state, action) {
      return { ...state, successToast: true };
    },
    hideSuccessToast(state, action) {
      return { ...state, successToast: false, successMessage: "" };
    },
    showFailureToast(state, action) {
      return { ...state, failureToast: true };
    },
    hideFailureToast(state, action) {
      return { ...state, failureToast: false, failureMessage: "" };
    },
    setSuccessToast(state, action) {
      return { ...state, successMessage: action.payload.message };
    },
    setFailureToast(state, action) {
      return { ...state, failureMessage: action.payload.message };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
