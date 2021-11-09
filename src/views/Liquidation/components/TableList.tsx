//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TokenSymbol from "../../../components/TokenSymbol";
import Value from "../../../components/Value";
import SelectToken from "../../../components/SelectToken";
const Item: React.FC = ({ item }) => {
  const { t } = useTranslation();

  const [showSelect, setShowSelect] = useState(false);
  const history = useHistory();

  const handleDocumentClick = useCallback(() => {
    setShowSelect(false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <StyledPcItem>
        <Card className=" flex-jc-center bold-600 font-size-14">
          <div className="flex1 flex-jc-start">
            <TokenSymbol symbol={item.name} size={25} />
            <TokenSymbol
              symbol={item.name}
              size={25}
              isRight={true}
              className="margin-right-5"
            />
            {item.name}
          </div>
          <div className="flex1">
            <Value value={77.45} suffix="%" />
          </div>
          <div className="flex1">
            <Value
              value={item.staked}
              suffix={<span className="margin-left-4 font-size-10">NEST</span>}
            />

            <div className="color-grey font-size-10 bold-500">
              <Value value={284} prefix="$" />
            </div>
          </div>
          <div className="flex1">
            <Value
              value={item.staked}
              suffix={<span className="margin-left-4 font-size-10">PUSD</span>}
            />

            <div className="color-grey font-size-10 bold-500">
              <Value value={284} prefix="$" />
            </div>
          </div>
          <div className="flex1 flex-jc-center">
            <span>
              <Value
                value={item.liqRatio}
                suffix={
                  <span className="margin-left-4 font-size-10">PUSD</span>
                }
              />
            </span>
            <div className="position-relative">
              <Button
                text={t("zhubi")}
                variant="secondary"
                width="80px"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelect(!showSelect);
                }}
              />
              <SelectToken
                showSelect={showSelect}
                list={item.selectList}
                active={item.active}
                toggleShow={() => {
                  setShowSelect(!showSelect);
                }}
                onChangeSelect={(select) => {
                  history.push(`/coin/${item.name}/${select.name}`);
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
            <TokenSymbol symbol={item.name} size={40} />
            <TokenSymbol symbol={item.name} size={40} isRight={true} />
          </div>
          <Spacer size="sm" />
          <div className="font-size-16 text-center width-100"> {item.name}</div>

          <Spacer size="mmd" />

          <Label
            height="56px"
            label={t("dqdyl")}
            value={<Value value={77.45} suffix="%" />}
          />
          <Spacer size="mmd" />

          <Label
            height="56px"
            label={t("dyzc")}
            value={
              <div className="text-right">
                <div className="font-size-14">
                  <Value
                    value={item.staked}
                    suffix={
                      <span className="margin-left-4 font-size-10">NEST</span>
                    }
                  />
                </div>
                <div className="color-grey font-size-10">
                  <Value value={284} prefix="$" />
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
                    value={item.staked}
                    suffix={
                      <span className="margin-left-4 font-size-10">PUSD</span>
                    }
                  />
                </div>
                <div className="color-grey font-size-10">
                  <Value value={284} prefix="$" />
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
                value={item.liqRatio}
                suffix={
                  <span className="margin-left-4 font-size-10">PUSD</span>
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
                e.stopPropagation();
                setShowSelect(!showSelect);
              }}
            />
          </div>

          <Spacer size="mmd" />
        </Card>
      </StyledMobileItem>
    </>
  );
};
const TableList: React.FC = ({ list }) => {
  return (
    <>
      {list && list.length
        ? list.map((item) => {
            return (
              <React.Fragment key={item.name}>
                <Item item={item} />
              </React.Fragment>
            );
          })
        : null}
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
