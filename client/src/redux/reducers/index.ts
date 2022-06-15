import { combineReducers } from "redux";
import post from "./post";
import profile from "./profile";

const reducers = combineReducers({
  post,
  profile,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
