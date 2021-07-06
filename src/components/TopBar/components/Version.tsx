import React from "react";
import styled from "styled-components";
import CardButton from "../../CardButton";
import useIsMobile from "../../../hooks/useIsMobile";
const Version: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div  className={` ${isMobile ? "" : "wing-blank-lg"} `}>
      <div className="width-100">
        <div className="space-white-lg"></div>
        <CardButton>V1</CardButton>
        <div className="space-white-lg"></div>
      </div>
    </div>
  );
};

export default Version;
