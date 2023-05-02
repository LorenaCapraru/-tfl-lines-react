import { useState, useEffect, React } from "react";
import RouteCards from "./RouteCards";

export default function Selector(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectLine, setSelectLine] = useState("");
  const [linesData, setLinesData] = useState([]);
  const [route, setRoute] = useState({});

  let handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSelectLine = (e) => {
    setSelectLine(e.target.value);
  };

  useEffect(() => {
    if (selectedValue) {
      fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedValue}`)
        .then((res) => res.json())
        .then((data) => {
          setLinesData(data);
        });
    }
  }, [selectedValue]);

  useEffect(() => {
    if (selectLine) {
      fetch(`https://api.tfl.gov.uk/Line/${selectLine}/Route`)
        .then((res) => res.json())
        .then((data) => {
          console.log("ROUTE", data);
          setRoute(data);
        });
    }
  }, [selectLine]);

  // console.log("route.disruptions", route.routeSections[0].originationName);
  console.log("selectedValue", selectedValue.toString().toUpperCase());
  return (
    <div>
      {/* {props.modes.map((el) => el.modeName)} */}
      {/* <label for="selectMode" id="selectMode">
        Select a Travel Mode
      </label> */}
      <select value={selectedValue} onChange={handleSelectChange}>
        <option>Choose a Mode of transport...</option>
        {props.modes.map((el) => (
          <option>{el.modeName}</option>
        ))}
      </select>

      {selectedValue !== "Choose a Mode of transport..." &&
      selectedValue.length > 0 ? (
        <>
          <select value={selectLine} onChange={handleSelectLine}>
            <option>Select a line...</option>
            {linesData.map((el) => (
              <option>{el.name}</option>
            ))}
          </select>
          {/* <p>You Selected Line: {selectLine}</p> */}
        </>
      ) : (
        <span>Waiting to choose</span>
      )}
      {Object.keys(route).length !== 0 && selectLine ? (
        <>
          <p className="ValueVsLine">
            {selectedValue.toString().toUpperCase()}:{" "}
            {selectLine.toString().toUpperCase()}
          </p>
          <RouteCards route={route} />
        </>
      ) : (
        <span>Wait for route</span>
      )}
    </div>
  );
}
