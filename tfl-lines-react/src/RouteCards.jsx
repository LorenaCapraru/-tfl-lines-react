import React from "react";

export default function RouteCards(props) {
  return (
    <div className="cardsContainer">
      <div className="card">
        <div>
          <p> Start of Line</p>
          {props.route.routeSections.map((el) => el.originationName)[0]}
        </div>
      </div>
      <div className="card">
        <p> End of Line</p>
        <p>{props.route.routeSections.map((el) => el.destinationName)[0]}</p>
      </div>
    </div>
  );
}
