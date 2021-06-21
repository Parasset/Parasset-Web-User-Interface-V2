//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
const Back: React.FC = ({ img, img1, text }) => (
  <>
    <div className="flex-jc-start">
      <img
        src={require(`../../assets/img/back_icon.png`)}
        width="5"
        height="8"
        className="margin-right-10"
      />
      <div className="flex-jc-start">
        <img
          src={require(`../../assets/img/${img}.png`)}
          width="25"
          height="25"
        />
        {img1 ? (
          <img
            src={require(`../../assets/img/${img1}.png`)}
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

export default Back;
