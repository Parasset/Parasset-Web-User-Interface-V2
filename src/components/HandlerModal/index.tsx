//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import CardButton from "../CardButton";
import Label from "../Label";
import Button from "../Button";
import Input from "../Input";
import Value from "../Value";
import TokenSymbol from "../TokenSymbol";

export default function HandlerModal({
  isOpen,
  onDismiss,
  title,
  label,
  balanceTxt,
  columns,
  disabled,
  icon1,
  icon2,
  tokenName,
  max,
  handleChange,
  onSelectMax,
  onConfirm,
  val,
  type,
  placeholder,
  onBlur,
  onFocus,
  showApprove,
  approveStatus,
  approve,
  approveTokenName,
}) {
  const { t } = useTranslation();
  const [isBlur,setIsBlur]=useState(false)

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        showHeader={true}
        title={title}
      >
        <Spacer size="mmd" />
        <div className="flex-jc-center">
          <div className="color-grey">{label}</div>
          <div>
            <span className="color-grey"> {balanceTxt}：</span>
            <span
              className="text-underline cursor-pointer "
              onClick={onSelectMax}
            >
              <Value decimals={6} value={max} />
            </span>
          </div>
        </div>
        <Spacer size="mmd" />
        <CardButton
          className={`${isBlur?'input-focus':'input-no-focus'}  width-100 wing-blank-lg cursor-pointer input-dark-box`}
          size="lg"
        >
          <div className="flex-jc-center">
            <div className="flex-jc-start font-size-12">
              <div className="flex-jc-start margin-right-10">
                <TokenSymbol size="25" symbol={icon1} />
                {icon2 ? (
                  <TokenSymbol size="25" symbol={icon2} isRight={true} />
                ) : null}
              </div>
              <span>{tokenName}</span>
            </div>
            <Input
              placeholder={placeholder}
              type={type}
              value={val}
              onChange={handleChange}
              className="flex15"
              onBlur={(e) => {
                onBlur(e);
                setIsBlur(false);
              }}
              onFocus={(e) => {
                onFocus(e);
                setIsBlur(true);
              }}
            />
          </div>
        </CardButton>
        {columns &&
          Object.keys(columns).map((key) => {
            const item = columns[key];
            return (
              <React.Fragment key={key}>
                <Spacer size="mmd" />
                <Label
                  label={
                    item.isTooltip ? (
                      <Tooltip title={t(item.tip)}>
                        <div className="text-underline cursor-pointer"> {t(item?.label)}</div>
                      </Tooltip>
                    ) : (
                      t(item?.label) + (item?.labelUnit ? item?.labelUnit : "")
                    )
                  }
                  value={
                    <div className="flex-jc-end">
                      {item?.value}
                      {item?.unit}
                    </div>
                  }
                />
              </React.Fragment>
            );
          })}

        <Spacer size="mmd" />
        {showApprove && approveStatus ? (
          <Button
            text={t("sq") + approveTokenName || ""}
            variant="secondary"
            disabled={disabled}
            onClick={approve}
          />
        ) : (
          <Button
            variant="secondary"
            text={t("queren")}
            disabled={disabled}
            onClick={onConfirm}
          />
        )}
      </Modal>
    </>
  );
}
