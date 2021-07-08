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
  const { t } = useTranslation();
  return (
    <>
      <BigValue text={t('dyzcsdsz')}  color="#DD8751"/>
      <BigValue text={t('pxzcltsz')}color="#77A89A" />
      <BigValue text={t('bxcldxzsz')} color="#5DB3D3"/>
      <TableTitle />
      <TableList />
      <Footer/>
    </>
  );
};

export default Home;
