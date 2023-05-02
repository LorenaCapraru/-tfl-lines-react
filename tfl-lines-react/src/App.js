import { useEffect, useState } from "react";
import "./App.css";
import Selector from "./Selector";

function App() {
  const [modes, setModes] = useState([]);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Meta/modes`)
      .then((res) => res.json())
      .then((data) => {
        setModes(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Transport for London Line Information</h1>
      <Selector modes={modes} />
      {/* {modes.map((el) => el.modeName)} */}
    </div>
  );
}

export default App;
