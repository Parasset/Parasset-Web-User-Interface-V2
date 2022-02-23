//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
const useMineInfo = (mine, itank) => {
  const [staked, setStaked] = useState(0);
  const [earned, setEarned] = useState(0);
  const [apy, setApy] = useState(0);
  const [tvl, setTvl] = useState(0);
  const [info, setInfo] = useState({
    rewardRate: 0,
    totalSupply: 0,
  });
  const parasset = useParasset();
  const block = useBlockNumber();

  const fetchStaked = useCallback(
    async (address = parasset?.myAccount) => {
      const staked = await parasset.getStaked(
        mine?.depositToken?.address,
        address
      );
      setStaked(staked);
      return staked;
    },
    [parasset?.myAccount, mine]
  );
  const fetchEarned = useCallback(
    async (address = parasset?.myAccount) => {
      const earned = await parasset.getEarned(
        mine?.depositToken?.address,
        address
      );
      setEarned(earned);
      return earned;
    },
    [parasset?.myAccount, mine]
  );
  const fetchChannelInfo = useCallback(async () => {
    const info = await parasset.getChannelInfo(
      mine?.depositToken?.address,
      block
    );

    setInfo(info);
  }, [parasset?.myAccount, mine, block]);

  const fetchTvl = useCallback(async () => {
    if (itank?.itankContract && mine?.depositToken) {
      const { depositToken } = mine;
      const { tvl, rewardRate } = await parasset.getMineTvl(
        depositToken,
        depositToken.address,
        block,
        itank
      );
      setTvl($isPositiveNumber($isFiniteNumber(tvl)));

      const apy = await parasset.getMineApy(tvl, rewardRate);

      setApy($isPositiveNumber($isFiniteNumber(apy)));
    }
  }, [parasset?.myAccount, mine, block, itank]);

  const fetchInfo = useCallback(async () => {
    fetchStaked();
    fetchEarned();
    fetchChannelInfo();
    fetchTvl();
  }, [parasset?.myAccount, mine, block, itank]);

  useEffect(() => {
    let refreshInterval = true;
    if (parasset?.myAccount && mine?.depositToken && refreshInterval) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [parasset?.myAccount, block, mine, itank]);

  return { staked, earned, info, tvl, apy, fetchInfo };
};

export default useMineInfo;
