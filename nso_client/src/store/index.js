import {configureStore} from "@reduxjs/toolkit";

// reducers
import userReducer from "../features/authentication/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
