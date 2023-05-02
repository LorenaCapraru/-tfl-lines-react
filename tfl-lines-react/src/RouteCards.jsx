import React from "react";

export default function RouteCards(props) {
  return (
    <div className="cardsContainer">
      <div className="card">
        <p className="descriptionLane">START OF LINE</p>
        <p className="routeName">
          {props.route.routeSections.map((el) => el.originationName)[0]}
        </p>
      </div>
      <span>➔</span>
      <div className="card">
        <p className="descriptionLane">END OF LINE</p>
        <p className="routeName">
          {props.route.routeSections.map((el) => el.destinationName)[0]}
        </p>
      </div>
    </div>
  );
}
