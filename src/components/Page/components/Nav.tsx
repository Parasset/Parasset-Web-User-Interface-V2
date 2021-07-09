//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWallet } from "use-wallet";
import Spacer from "../../Spacer";
import Button from "../../Button";

import NavBar from "../../TopBar/components/NavBar";
import Lang from "../../TopBar/components/Lang";
import Version from "../../TopBar/components/Version";
import useEncryptAddress from "../../../hooks/useEncryptAddress";
const Nav: React.FC = ({ onShowWallet }) => {
  const { account } = useWallet();
  const { t } = useTranslation();
  const newAccount = useEncryptAddress(account);
  return (
    <>
      <NavBar />
      <Spacer size="mmd" />
      <Button
        text={!account ? t("ljqb") : newAccount}
        variant="secondary"
        onClick={onShowWallet}
      />
      <Spacer size="mmd" />
      <Version />
      <Lang />
    </>
  );
};

export default Nav;
