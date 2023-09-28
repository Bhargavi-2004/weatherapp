import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import ShowWeather from "./components/ShowWeather";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Main />
        <ShowWeather />
      </div>
    </>
  );
}

export default App;
