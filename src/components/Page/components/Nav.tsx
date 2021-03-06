//@ts-nocheck
import React from "react";
import { useTranslation } from "react-i18next";
import { useWallet } from "use-wallet";
import Spacer from "../../Spacer";
import Button from "../../Button";

import NavBar from "../../TopBar/components/NavBar";
import Version from "../../TopBar/components/Version";
import useEncryptAddress from "../../../hooks/useEncryptAddress";
const Nav: React.FC = ({ onShowWallet, toggleShow }) => {
  const { account } = useWallet();
  const { t } = useTranslation();
  const newAccount = useEncryptAddress(account);
  return (
    <>
      <NavBar toggleShow={toggleShow} />
      <Spacer size="mmd" />
      <div className={"wing-blank-lg"}>
        <Button
          text={!account ? t("ljqb") : newAccount}
          variant="secondary"
          onClick={onShowWallet}
        />
        <Spacer size="mmd" />
        <Version />
      </div>
    </>
  );
};

export default Nav;
