//@ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card";

const BtnLink: React.FC = ({ text, path }) => {
  const history = useHistory();
  return (
    <>
      <Card
        className="wing-blank-lg width-100 text-center cursor-pointer bg-white height44 flex-row-center-center color-light-blue text-underline"
        onClick={() => {
          history.push(path);
        }}
      >
        {text}
      </Card>
    </>
  );
};

export default BtnLink;
