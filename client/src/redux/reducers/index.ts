import { combineReducers } from "redux";
import posts from "./post";
import profile from "./profile";

const reducers = combineReducers({
  posts,
  profile,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
