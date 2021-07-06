//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import TableTitle from "./components/TableTitle";
import TableList from "./components/TableList";
import Footer from "./components/Footer";

const Home: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <BigValue text="抵押资产锁定市值"  color="#DD8751"/>
      <BigValue text="平行资产流通市值" color="#77A89A" />
      <BigValue text="保险池流动性总市值"  color="#5DB3D3"/>
      <TableTitle />
      <TableList />
      <Footer/>
    </>
  );
};

export default Home;
