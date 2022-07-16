import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import AddJoke from "./pages/AddJoke";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createJoke" element={<AddJoke />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
