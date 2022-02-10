//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Progress from "./Progress";
import Button from "../../../components/Button";
import Value from "../../../components/Value";
import TokenSymbol from "../../../components/TokenSymbol";

const Depot: React.FC = ({ list, loading }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      {!loading ? (
        <>
          {list.length ? (
            <>
              {list.map((item, i) => {
                return (
                  <div key={item.name}>
                    <Card className="wing-blank-lg position-relative bg-white">
                      <Spacer />
                      <Progress
                        ratio={item.rate}
                        maxRatio={item.maxRatio}
                        liqRatio={item.liqRatio}
                      />

                      <Spacer />
                      <div className="flex-row-center-center ">
                        <TokenSymbol symbol={item.icon1} size={40} />
                        <TokenSymbol
                          symbol={item.icon2}
                          size={40}
                          isRight={true}
                        />
                      </div>
                      <Spacer size={"sm"} />
                      <div className="font-size-16 bold-600 text-center">
                        {item.name}
                      </div>
                      <Spacer />
                      <StyledCardButton className="wing-blank-lg">
                        <div className="flex-jc-center flex1">
                          <div className="color-grey">{t("dyzc")}</div>
                          <div className="text-right">
                            <div className=" bold-600 font-size-16">
                              <Value value={item.mortgageAssets} decimals={6} />
                              {item.depositTokenName}
                            </div>
                            <div className="font-size-10 color-grey">
                              <Value value={item.mortgageValue} prefix="$" />
                            </div>
                          </div>
                        </div>
                      </StyledCardButton>
                      <Spacer />
                      <StyledCardButton className="wing-blank-lg">
                        <div className="flex-jc-center flex1">
                          <div className="color-grey">{t("zbzw")}</div>
                          <div className="text-right">
                            <div className=" bold-600 font-size-16">
                              {" "}
                              <Value value={item.parassetAssets} decimals={6} />
                              {item.earnTokenName}
                            </div>
                            <div className="font-size-10 color-grey">
                              <Value value={item.parassetValue} prefix="$" />
                            </div>
                          </div>
                        </div>
                      </StyledCardButton>
                      <Spacer />
                      <StyledCardButton className="wing-blank-lg">
                        <div className="flex-jc-center flex1">
                          <div className="color-grey">{t("wdf")}</div>
                          <div className="text-right">
                            <div className="  bold-600 font-size-16">
                              <Value value={item.fee} showAll={true} />
                              {item.earnTokenName}
                            </div>
                            <div className="font-size-10 color-grey">
                              <Value
                                value={item.feeValue}
                                prefix="$"
                                showAll={true}
                              />
                            </div>
                          </div>
                        </div>
                      </StyledCardButton>

                      <Spacer />
                      <Button
                        text={t("chakan")}
                        variant="secondary"
                        onClick={() => {
                          history.push(`/debt/detail/${item.key}`);
                        }}
                      />
                      <Spacer />
                    </Card>
                    <Spacer />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center">
              <Spacer />

              <img
                alt="image"
                src={require("../../../assets/img/icon_empty.png")}
                width="50"
                height="50"
              />
              <Spacer />
              <div className="color-grey text-center  line-height-20">
                {t("zwzc")}
              </div>
              <Spacer />
            </div>
          )}
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

      <Spacer />
    </>
  );
};
const StyledCardButton = styled(CardButton)`
  height: 50px;
  display: flex;
  align-items: center;
`;

export default Depot;
