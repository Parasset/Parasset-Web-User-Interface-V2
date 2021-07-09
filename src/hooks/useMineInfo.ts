//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber1 from "bignumber.js";
import useBasisCash from "./useBasisCash";
import { useBlockNumber } from "../state/application/hooks";

const useMineInfo = (mine) => {
  const [staked, setStaked] = useState(0);
  const [earned, setEarned] = useState(0);
  const [info, setInfo] = useState({
    rewardRate: 0,
    totalSupply: 0,
  });
  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchStaked = useCallback(
    async (address = basisCash?.myAccount) => {
      const staked = await basisCash.getStaked(mine?.depositToken?.address, address);
      setStaked(staked);
      return staked;
    },
    [basisCash?.myAccount, mine]
  );
  const fetchEarned = useCallback(
    async (address = basisCash?.myAccount) => {
      const earned = await basisCash.getEarned(mine?.depositToken?.address, address);
      setEarned(earned);
      return earned;
    },
    [basisCash?.myAccount, mine]
  );
  const fetchChannelInfo = useCallback(async () => {
    const info = await basisCash.getChannelInfo(mine?.depositToken?.address, block);

    setInfo(info);
  }, [basisCash?.myAccount, mine, block]);

  const fetchInfo = useCallback(async () => {
    fetchStaked();
    fetchEarned();
    fetchChannelInfo();
  }, [basisCash?.myAccount, mine, block]);

  useEffect(() => {
    if (basisCash?.myAccount) {
      fetchInfo();
    }
  }, [basisCash?.myAccount, block, mine]);

  return { staked, earned,info };
};

export default useMineInfo;
