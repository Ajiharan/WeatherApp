import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";

import userReducer from "./user/UserSlice";

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/setSignOut") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
