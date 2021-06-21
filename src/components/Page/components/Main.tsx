import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Right from "./Right";
import Spacer from "../../Spacer";
const Main: React.FC = ({ children }) => {
  return (
    <div className="flex-al-start  width-100">
      <div className="flex1">
        <Header />
        <div className="wing-blank-lg">
          <Spacer />
          {children}
          <Spacer />
        </div>
      </div>

      <Right />
    </div>
  );
};

export default Main;
