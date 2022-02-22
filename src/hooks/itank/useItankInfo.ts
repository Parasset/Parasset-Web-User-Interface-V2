//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useItankInfo = (itank) => {
  const [itankInfo, setItankInfo] = useState({
    depositFundBalance: 0,
    earnFundBalance: 0,
    depositFundValue: 0,
    earnFundValue: 0,
    perShare: 0,
    totalSupply: 0,
    totalAssets: 0,
    avgPrice: 0,
    revenue: 0,
  });

  const [lastDate, setLastDate] = useState({
    nextStartTime: "",
    nextEndTime: "",
    nextStartTimeNum: 0,
    nextEndTimeNum: 0,
  });
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [fee, setFee] = useState(0);

  const parasset = useParasset();
  const block = useBlockNumber();

  const fetchFundBalance = useCallback(async () => {
    let itankInfo = await parasset.getFundAsset(itank);
    setItankInfo(itankInfo);
  }, [parasset?.myAccount, itank]);

  const fetchLastDate = useCallback(async () => {
    let lastDate = await parasset.getLastDate(itank);
    setLastDate(lastDate);
  }, [parasset?.myAccount, itank]);

  const fetchRedeemAmount = useCallback(
    async (address = parasset?.myAccount) => {
      let redeemAmount = await parasset.getRedemptionAmount(
        itank.itankContract,
        itank?.itankContract?.decimal,
        address
      );
      setRedeemAmount(redeemAmount);
    },
    [parasset?.myAccount, itank]
  );

  const fetchFee = useCallback(async () => {
    let fee = await parasset.getExchangeFee(itank.itankContract);
    setFee(fee);
  }, [parasset?.myAccount, itank]);
  const fetchInfo = useCallback(async () => {
    fetchFundBalance();
    fetchRedeemAmount();
    fetchLastDate();
    fetchFee();
  }, [parasset?.myAccount, itank, block]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      parasset?.myAccount &&
      itank &&
      itank.itankContract &&
      refreshInterval
    ) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, block, itank]);

  return { itankInfo, lastDate, fee, redeemAmount };
};

export default useItankInfo;
