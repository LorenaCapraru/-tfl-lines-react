import { useState, useEffect, React } from "react";

export default function Selector(props) {
  const [selectedValue, setSelectedValue] = useState("");
  let handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const [selectLine, setSelectLine] = useState("");
  const handleSelectLine = (e) => {
    setSelectLine(e.target.value);
  };

  const [linesData, setLinesData] = useState("");
  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLinesData(data);
      });
  }, [selectedValue]);

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

      {selectedValue !== "Choose a Mode of transport..." &&
      selectedValue.length > 0 ? (
        <select value={selectLine} onChange={handleSelectLine}>
          <option>Select a line...</option>
          {linesData.map((el) => (
            <option>{el.name}</option>
          ))}
          <option>
            {linesData.map((el) =>
              el.disruptions.map((el) => el.affectedRoutes.map((el) => el.name))
            )}
          </option>
        </select>
      ) : (
        <span>Waiting to choosee</span>
      )}
    </div>
  );
}
