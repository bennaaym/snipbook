import { combineReducers } from "redux";
import posts from "./post";
import auth from "./auth";
import profile from "./profile";

const reducers = combineReducers({
  auth,
  posts,
  profile,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
