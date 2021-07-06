import React from "react";
import useIsMobile from "../../../hooks/useIsMobile";
const Lang: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className="wing-blank-lg ">
      <div className={` ${isMobile ? "" : "bd-bottom width-100"} `}>
        <div className="space-white-lg"></div>
        <div
          className={`wing-blank  ${
            isMobile ? "flex-row-center-center" : "flex-jc-start  flex-wrap"
          } `}
        >
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
