import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="lds-css ng-scope">
      <div style={{ width: "100%", height: "100%" }} className="lds-rolling">
        <div />
      </div>
    </div>
  );
};

export default Loading;
