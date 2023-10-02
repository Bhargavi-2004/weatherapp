import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
// import "../src/Responsive.css";
import ShowWeather from "./components/ShowWeather";

function App() {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <div className="container">
        <Navbar />
        <Main />
        {/* <ShowWeather /> */}
      </div>
    </>
  );
}

export default App;
