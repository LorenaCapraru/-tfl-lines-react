import { useState, useEffect, React } from "react";

export default function Selector(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectLine, setSelectLine] = useState("");
  const [linesData, setLinesData] = useState([]);
  const [route, setRoute] = useState([]);

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
          console.log(data);
          setLinesData(data);
        });
    }
  }, [selectedValue]);

  useEffect(() => {
    if (selectLine) {
      fetch(`https://api.tfl.gov.uk/Line/${selectLine}/Route`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRoute(data);
        });
    }
  }, [selectLine]);

  return (
    <div>
      {/* {props.modes.map((el) => el.modeName)} */}
      <label for="selectMode" id="selectMode">
        Select a Travel Mode
      </label>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option>Choose a Mode of transport...</option>
        {props.modes.map((el) => (
          <option>{el.modeName}</option>
        ))}
      </select>
      <p>You Selected Mode: {selectedValue}</p>

      {selectedValue !== "Choose a Mode of transport..." &&
      selectedValue.length > 0 ? (
        <>
          <select value={selectLine} onChange={handleSelectLine}>
            <option>Select a line...</option>
            {linesData.map((el) => (
              <option>{el.name}</option>
            ))}
          </select>
          <p>You Selected Line: {selectLine}</p>
        </>
      ) : (
        <span>Waiting to choose</span>
      )}
      {/* {route ? <p>OriginationName:{route.(disruptions[0]).id}</p> : null} */}
    </div>
  );
}
