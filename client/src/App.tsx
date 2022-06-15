import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import { Home, Posts, Profile } from "./pages";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<></>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
