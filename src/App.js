import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./components/Map.js";
import Calender from "./components/Calender";
import SavedLocation from "./components/SavedLocation";

function App() {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Map" element={<Map />} />
            <Route
             path="/SavedLocation"
              element={<SavedLocation />}
            />
            <Route path="/Calender" element={<Calender />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
