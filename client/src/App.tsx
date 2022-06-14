import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import { Home } from "./pages";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<></>} />
      </Routes>
    </div>
  );
};

export default App;
