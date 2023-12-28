import "./css/App.css";
import Main from "./component/Main";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./component/Map";

function App() {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <div className="main-container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Map" element={<Map />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
