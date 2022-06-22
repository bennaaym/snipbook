import { Route, Routes } from "react-router-dom";
import { NavBar, PostDetails, ProfilePosts } from "./components";
import PostForm from "./components/profile/PostForm";
import { ProtectedRoute, ProtectedAuth } from "./components";
import { Home, Posts, Profile, SignIn, SignUp } from "./pages";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedAuth />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route path="profile" element={<Profile />}>
          <Route path=":id" element={<ProfilePosts />} />
          <Route element={<ProtectedRoute />}>
            <Route path=":id/post/create" element={<PostForm />} />
            <Route path=":id/post/update/:id" element={<PostForm />} />
          </Route>
        </Route>
        <Route path="posts">
          <Route path="" element={<Posts />} />
          <Route path="search" element={<Posts />} />
          <Route path=":id" element={<PostDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
