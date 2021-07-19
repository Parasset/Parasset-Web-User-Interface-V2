//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
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
  });

  const [lastDate, setLastDate] = useState({
    nextStartTime: "",
    nextEndTime: "",
    preStartTime: "",
    preEndTime: "",
    nextStartTimeNum: 0,
    nextEndTimeNum: 0,
    preStartTimeNum: 0,
    preEndTimeNum: 0,
  });
  const [redeemAmount, setRedeemAmount] = useState(0);

  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchFundBalance = useCallback(async () => {
    let itankInfo = await basisCash.getFundAsset(itank);
    setItankInfo(itankInfo);
  }, [basisCash?.myAccount, itank]);

  const fetchLastDate = useCallback(async () => {
    let lastDate = await basisCash.getLastDate(itank);
    console.log(
      "🚀 ~ file: useItankInfo.ts ~ line 36 ~ fetchLastDate ~ lastDate",
      lastDate
    );

    setLastDate(lastDate);
  }, [basisCash?.myAccount, itank]);

  const fetchRedeemAmount = useCallback(
    async (address = basisCash?.myAccount) => {
      let redeemAmount = await basisCash.getRedemptionAmount(
        itank.itankContract,
        itank?.itankContract?.decimal,
        address
      );
      setRedeemAmount(redeemAmount);
    },
    [basisCash?.myAccount, itank]
  );

  const fetchInfo = useCallback(async () => {
    fetchFundBalance();
    fetchRedeemAmount();
    fetchLastDate();
  }, [basisCash?.myAccount, itank, block]);

  useEffect(() => {
    if (basisCash?.myAccount && itank.itankContract) {
      fetchInfo();
    }
  }, [basisCash?.myAccount, block, itank]);

  return { itankInfo ,lastDate,redeemAmount};
};

export default useItankInfo;
