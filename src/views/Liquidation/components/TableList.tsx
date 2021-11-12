//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TokenSymbol from "../../../components/TokenSymbol";
import Value from "../../../components/Value";
const Item: React.FC = ({ item, onSelect, openModal }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledPcItem>
        <Card className=" flex-jc-center bold-600 font-size-14">
          <div className="flex1 flex-jc-start">
            <TokenSymbol symbol={item.depositTokenName} size={25} />
            <TokenSymbol
              symbol={item.earnTokenName}
              size={25}
              isRight={true}
              className="margin-right-5"
            />
            {item.name}
          </div>
          <div className="flex1">
            <Value value={item.rate} decimals={2} suffix="%" />
          </div>
          <div className="flex1">
            <Value
              value={item.mortgageAssets}
              decimals={2}
              suffix={
                <span className="margin-left-4 font-size-10">
                  {item.depositTokenName}
                </span>
              }
            />

            <div className="color-grey font-size-10 bold-500">
              <Value value={item.mortgageValue} prefix="$" />
            </div>
          </div>
          <div className="flex1">
            <Value
              value={item.parassetAssets}
              decimals={2}
              suffix={
                <span className="margin-left-4 font-size-10">
                  {item.earnTokenName}
                </span>
              }
            />

            <div className="color-grey font-size-10 bold-500">
              <Value value={item.parassetValue} prefix="$" />
            </div>
          </div>
          <div className="flex1 flex-jc-center">
            <span>
              <Value
                value={item.maxLiqFee}
                decimals={2}
                suffix={
                  <span className="margin-left-4 font-size-10">
                    {item.earnTokenName}
                  </span>
                }
              />
            </span>
            <div className="position-relative">
              <Button
                text={t("qingsuan")}
                variant="secondary"
                width="80px"
                onClick={(e) => {
                  onSelect(item.itemKey);
                  openModal()
                }}
              />
            </div>
          </div>
        </Card>
        <Spacer size="sm" />
        <Spacer size="sm" />
      </StyledPcItem>
      <StyledMobileItem>
        <Card className="wing-blank-lg">
          <Spacer size="mmd" />
          <div className="color-grey">{t("zhaicang")}</div>
          <Spacer size="mmd" />
          <div className="flex-row-center-center">
            <TokenSymbol symbol={item.depositTokenName} size={40} />
            <TokenSymbol symbol={item.earnTokenName} size={40} isRight={true} />
          </div>
          <Spacer size="sm" />
          <div className="font-size-16 text-center width-100"> {item.name}</div>

          <Spacer size="mmd" />

          <Label
            height="56px"
            label={t("dqdyl")}
            value={<Value value={item.rate} suffix="%" decimals={2} />}
          />
          <Spacer size="mmd" />

          <Label
            height="56px"
            label={t("dyzc")}
            value={
              <div className="text-right">
                <div className="font-size-14">
                  <Value
                    value={item.mortgageAssets}
                    decimals={2}
                    suffix={
                      <span className="margin-left-4 font-size-10">
                        {item.depositTokenName}
                      </span>
                    }
                  />
                </div>
                <div className="color-grey font-size-10">
                  <Value value={item.mortgageValue} prefix="$" />
                </div>
              </div>
            }
          />
          <Spacer size="mmd" />
          <Label
            height="56px"
            label={t("zbzw")}
            value={
              <div className="text-right">
                <div className="font-size-14">
                  <Value
                    value={item.parassetAssets}
                    decimals={2}
                    suffix={
                      <span className="margin-left-4 font-size-10">
                        {item.earnTokenName}
                      </span>
                    }
                  />
                </div>
                <div className="color-grey font-size-10">
                  <Value value={item.parassetValue} prefix="$" />
                </div>
              </div>
            }
          />

          <Spacer size="mmd" />

          <Label
            height="56px"
            label={t("zdqsf")}
            value={
              <Value
                value={item.maxLiqFee}
                decimals={2}
                suffix={
                  <span className="margin-left-4 font-size-10">
                    {item.earnTokenName}
                  </span>
                }
              />
            }
          />

          <Spacer />

          <div className="position-relative">
            <Button
              text={t("qingsuan")}
              variant="secondary"
              onClick={(e) => {
                onSelect(item.itemKey);
                openModal()
              }}
            />
          </div>

          <Spacer size="mmd" />
        </Card>
      </StyledMobileItem>
    </>
  );
};
const TableList: React.FC = ({ list, loading, onSelect, openModal }) => {
  const { t } = useTranslation();
  return (
    <>
      {!loading ? (
        <>
          {list && list.length
            ? list.map((item) => {
                return (
                  <React.Fragment key={item.itemKey}>
                    <Item item={item} onSelect={onSelect} openModal={openModal} />
                  </React.Fragment>
                );
              })
            : null}
        </>
      ) : (
        <>
          <div className="text-center">
            <Spacer />
            <div className="color-grey text-center  line-height-20">
              {t("jzz")}
            </div>
            <Spacer />
          </div>
        </>
      )}
    </>
  );
};
const StyledPcItem = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledMobileItem = styled.div`
  margin-bottom: 15px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export default TableList;
