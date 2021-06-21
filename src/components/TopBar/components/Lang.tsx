import React from "react";

const Lang: React.FC = () => {
  return (
    <div className="wing-blank-lg ">
      <div className="bd-bottom width-100">
        <div className="space-white-lg"></div>
        <div className="wing-blank flex-jc-start  flex-wrap ">
          <div className=" flex-row-center-center width-33">
            <img
              src={require("../../../assets/img/EN.png")}
              width="30"
              height="30"
            />
          </div>
          <div className=" flex-row-center-center width-33 ">
            <img
              src={require("../../../assets/img/CN.png")}
              width="30"
              height="30"
            />
          </div>
        </div>
        <div className="space-white-lg"></div>
      </div>
    </div>
  );
};

export default Lang;
