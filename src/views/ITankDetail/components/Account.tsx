//@ts-nocheck
import React from "react";

import CardButton from "../../../components/CardButton";

import Value from "../../../components/Value";
import TokenSymbol from "../../../components/TokenSymbol";
const Info: React.FC = ({ currency, value, dollarValue }) => {
  return (
    <>
      <CardButton className="width-100 wing-blank-lg" size="lg">
        <div className="flex-jc-center width-100">
          <div className="flex-jc-center ">
            <TokenSymbol
              symbol={currency}
              size={35}
              className="margin-right-10"
            />
            {currency}
          </div>
          <div className="text-right">
            <div className="font-size-14">
              <Value value={value} decimals={6} />
            </div>
            <div className="color-grey font-size-10">
              <Value value={dollarValue} prefix="$" />
            </div>
          </div>
        </div>
      </CardButton>
    </>
  );
};

export default Info;
