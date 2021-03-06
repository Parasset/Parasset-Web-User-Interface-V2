import React from "react";
import styled from "styled-components";
import CardButton from "../../CardButton";
import useIsMobile from "../../../hooks/useIsMobile";
const Version: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className={` ${isMobile ? "" : "wing-blank-lg"} `}>
      <div className="width-100">
        <div className="space-white-lg" />
        <a
          href="https://v1.parasset.top/
        "
          target="__blank"
        >
          {" "}
          <StyledCardButton className="text-center  flex-row-center-center bold-500">
            Parasset V1
          </StyledCardButton>
        </a>

        <div className="space-white-lg" />
      </div>
    </div>
  );
};
//
const StyledCardButton = styled(CardButton)`
  box-shadow: 0 0 10px ${(props) => props.theme.color.grey[200]};
  background-color: white;
  height: 44px;
  min-height: 44px;
`;

export default Version;
