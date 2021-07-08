//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useBasisCash from "../../hooks/useBasisCash";
import { Bank } from "../../basis-cash";
import config, { bankDefinitions } from "../../config";

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (!basisCash.isUnlocked) continue;
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: basisCash.contracts[bankInfo.depositContract],
        earnToken: basisCash.externalTokens[bankInfo.earnTokenName],
      });
    }
    setBanks(banks);
  }, [basisCash, basisCash?.isUnlocked, setBanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch pools: ${err.stack}`)
      );
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
