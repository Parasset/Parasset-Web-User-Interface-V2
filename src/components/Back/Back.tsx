//@ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import Spacer from "../Spacer";
const Back: React.FC = ({ img, img1, text }) => {
  const history = useHistory();
  return (
    <>
      <div
        className="flex-jc-start cursor-pointer"
        onClick={() => {
          history.goBack();
        }}
      >
        <img
          alt="image"
          src={require(`../../assets/svg/back_icon.svg`)}
          width="5"
          height="8"
          className="margin-right-10"
        />
        <div className="flex-jc-start">
          <img
            alt="image"
            src={require(`../../assets/svg/${img}.svg`)}
            width="25"
            height="25"
          />
          {img1 ? (
            <img
              alt="image"
              src={require(`../../assets/svg/${img1}.svg`)}
              width="25"
              height="25"
              className="margin-left-minus-10"
            />
          ) : null}

          <span className="margin-left-5">{text}</span>
        </div>
      </div>
      <Spacer />
    </>
  );
};

export default Back;
