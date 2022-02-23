//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useParasset from "../../hooks/useParasset";

import config, { itankDefinitions } from "../../config";

const ITanks: React.FC = ({ children }) => {
  const [itanks, setItanks] = useState<Mine[]>([]);
  const parasset = useParasset();

  const fetchPools = useCallback(async () => {
    const itanks = [];
    for (const itankInfo of Object.values(itankDefinitions)) {
      if (!parasset.isUnlocked) continue;
      itanks.push({
        ...itankInfo,
        address: config.deployments[itankInfo.contract].address,
        itankContract: parasset.contracts[itankInfo.contract],
        depositToken: parasset.externalTokens[itankInfo.depositTokenName],
        earnToken: parasset.externalTokens[itankInfo.earnTokenName],
      });
    }

    setItanks(itanks);
  }, [parasset, parasset?.isUnlocked, setItanks]);

  useEffect(() => {
    if (parasset) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch Itanks: ${err.stack}`)
      );
    }
  }, [parasset, parasset?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ itanks }}>{children}</Context.Provider>;
};

export default ITanks;
