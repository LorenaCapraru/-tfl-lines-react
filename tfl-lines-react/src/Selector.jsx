import { useState, React } from "react";

export default function Selector(props) {
  const [selectedValue, setSelectedValue] = useState("");
  let handleSelectChange = (e) => {
    selectedValue(e.target.value);
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

      {selectedValue ? (
        <div className="card">
          {props.data
            .filter((el) => el.selectMode === selectedValue)
            .map((el) => el.modeName)}
        </div>
      ) : null}
    </div>
  );
}
