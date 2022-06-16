import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import PostForm from "./components/profile/PostForm";
import { Home, Posts, Profile, SignIn, SignUp } from "./pages";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="profile">
          <Route
            path="post/create"
            element={
              <Profile>
                <PostForm />
              </Profile>
            }
          />
          <Route
            path="post/update/:id"
            element={
              <Profile>
                <PostForm />
              </Profile>
            }
          />
        </Route>
        <Route path="posts" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
