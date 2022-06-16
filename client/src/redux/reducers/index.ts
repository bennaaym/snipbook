import { combineReducers } from "redux";
import posts from "./post";
import auth from "./auth";

const reducers = combineReducers({
  auth,
  posts,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
