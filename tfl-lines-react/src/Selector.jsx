import { useState, React } from "react";

export default function Selector(props) {
  const [selectedValue, setSelectedValue] = useState("");
  let handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

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

      {/* {selectedValue.length > 0 ? (
        <div className="card">
          {props.modes
            .filter((el) => el.selectMode === selectedValue)
            .map((el) => (
              <span>{el.modeName}</span>
            ))}
        </div>
      ) : null} */}
      {selectedValue !== "Choose a Mode of transport..." &&
      selectedValue.length > 0 ? (
        <span>Working</span>
      ) : (
        <span>Waiting to choose</span>
      )}
    </div>
  );
}
