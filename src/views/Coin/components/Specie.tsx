//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
      <Card className="wing-blank-lg">
        <Spacer />
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div> {t("dyzcsl")}</div>
          <div>
            {t("yue")}
            <span className="color-dark text-underline">23.3333</span>
          </div>
        </div>
        <Spacer size="sm" />
        {/* <Select /> */}
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
        <Spacer size="sm" />
        {/* <Select /> */}
        <Spacer size="mmd" />
        <Label label={t("dyl")} value="70%" className="wing-blank-lg" />
        <Spacer size="mmd" />
        <Label
          label={t('heyue')}
          value="0x4657df32…675df23b"
          className="wing-blank-lg"
        />

        <Spacer size="mmd" />
        <Label
          label={
            <Tooltip title={t("tip2")}>
              <div className="text-underline">{t("yyjdyf")}</div>
            </Tooltip>
          }
          value="0.01 ETH"
          className="wing-blank-lg"
        />

        <Spacer size="mmd" />
        <Label label={t("wdf")} value="0.01 PUSD" className="wing-blank-lg" />
        <Spacer />
        <Button text={t("zhubi")} variant="secondary" />
        <Spacer />
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};

export default Specie;
