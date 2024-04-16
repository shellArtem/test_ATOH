import { AnyAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  auth: false,
};

const UserReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGOUT_USER":
      return { ...state, name: payload, auth: false };
    case "LOG_USER":
      return { ...state, name: payload, auth: true };
      case "SAVE_USER":
      return { ...state, name: payload, auth: true };
    default:
      return state;
  }
};

export default UserReducer;
