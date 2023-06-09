import { useState, useEffect, React } from "react";
import RouteCards from "./RouteCards";

export default function Selector(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectLine, setSelectLine] = useState("");
  const [linesData, setLinesData] = useState([]);
  const [route, setRoute] = useState({});

  let handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    setSelectLine("");
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

  console.log("selectedValue", selectedValue.toString().toUpperCase());
  return (
    <div>
      <select
        className="selectedValueDropdown"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option>Choose a Mode of transport...</option>
        {props.modes.map((el) => (
          <option>{el.modeName}</option>
        ))}
      </select>

      {selectedValue !== "Choose a Mode of transport..." &&
      selectedValue.length > 0 &&
      linesData.length > 0 ? (
        <>
          <select
            className="selectedLineDropdown"
            value={selectLine}
            onChange={handleSelectLine}
          >
            <option>Select a line...</option>
            {linesData.map((el) => (
              <option>{el.name}</option>
            ))}
          </select>
        </>
      ) : selectedValue !== "Choose a Mode of transport..." &&
        selectedValue.length > 0 &&
        linesData.length === 0 ? (
        <div className="attentionNoLines">
          <span>&#9888; </span> No lines available. Choose a different Line.
        </div>
      ) : (
        ""
      )}
      {Object.keys(route).length !== 0 && selectLine !== "Select a line..." ? (
        <>
          <p className="ValueVsLine">
            {selectedValue.toString().toUpperCase()}:{" "}
            {selectLine.toString().toUpperCase()}
          </p>
          <RouteCards route={route} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
