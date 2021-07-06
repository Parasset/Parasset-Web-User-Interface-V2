//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Spacer from "../../Spacer";
import Button from "../../Button";

import NavBar from "../../TopBar/components/NavBar";
import Lang from "../../TopBar/components/Lang";
import Version from "../../TopBar/components/Version";

const Nav: React.FC = () => {
  return (
    <>
      <NavBar />
      <Spacer size="mmd" />
      <Button text="连接钱包" variant="secondary" />
      <Spacer size="mmd" />
      <Version />
      <Lang />
    </>
  );
};

export default Nav;
