import { combineReducers } from "redux";
import posts from "./post";

const reducers = combineReducers({
  posts,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
