//@ts-nocheck
import React from "react";
import Spacer from "../Spacer";
import Card from "../Card";

const Picker: React.FC = ({ children }) => (
  <>
    <div className="flex-jc-center font-size-15">
      {children}
      <div className="flex-jc-end">
        <div className="color-main">1W</div>
        <div className=" margin-left-10">1M</div>
        <div className=" margin-left-10">ALL</div>
      </div>
    </div>
  </>
);

export default Picker;
