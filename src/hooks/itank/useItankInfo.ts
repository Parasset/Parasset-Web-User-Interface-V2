//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
import {
  getDisplayNumber,
  getToBignumber,
  getTonumber,
} from "../../utils/formatBalance";
const useItankInfo = (itank) => {
  const [itankInfo, setItankInfo] = useState({
    depositFundBalance: 0,
    earnFundBalance: 0,
    depositFundValue: 0,
    earnFundValue: 0,
  });

  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchFundBalance = useCallback(async () => {
    const { depositToken, earnToken, itankContract, address } = itank;

    let depositFundBalance = await basisCash.getFundBalance(
      depositToken,
      address
    );
    let earnFundBalance = await basisCash.getFundBalance(earnToken, address);
    let negative = await itankContract._insNegative();
    earnFundBalance = new BigNumber(earnFundBalance)
      .minus(getTonumber(negative))
      .toNumber();
    let depositFundValue =
      itank.depositTokenName === "USDT" ? depositFundBalance : 0;
    let earnFundValue = itank.depositTokenName === "USDT" ? earnFundBalance : 0;
    setItankInfo({
      depositFundBalance,
      earnFundBalance,
      depositFundValue,
      earnFundValue,
    });
  }, [basisCash?.myAccount, itank]);

  const fetchInfo = useCallback(async () => {
    fetchFundBalance();
  }, [basisCash?.myAccount, itank, block]);

  useEffect(() => {
    if (basisCash?.myAccount && itank.itankContract) {
      fetchInfo();
    }
  }, [basisCash?.myAccount, block, itank]);

  return { itankInfo };
};

export default useItankInfo;
