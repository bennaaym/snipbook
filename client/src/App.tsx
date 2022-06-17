import { Route, Routes } from "react-router-dom";
import { NavBar, ProfilePosts } from "./components";
import PostForm from "./components/profile/PostForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home, Posts, Profile, SignIn, SignUp } from "./pages";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route path="posts" element={<ProfilePosts />} />
            <Route path="post/create" element={<PostForm />} />
            <Route path="post/update/:id" element={<PostForm />} />
          </Route>
        </Route>
        <Route path="posts" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
