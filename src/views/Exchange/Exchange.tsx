//@ts-nocheck
import React from "react";
import useIsMobile from "../../hooks/useIsMobile";
import Specie from "./components/Specie";

const Exchange: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className={`${isMobile ? "" : "wing-blank-xl1"}`}>
      <Specie />
    </div>
  );
};

export default Exchange;
