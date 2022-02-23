//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useParasset from "../../hooks/useParasset";

import config, { debtDefinitions } from "../../config";

const Debts: React.FC = ({ children }) => {
  const [debts, setItanks] = useState<Mine[]>([]);
  const parasset = useParasset();

  const fetchPools = useCallback(async () => {
    const debts = [];
    for (const debtInfo of Object.values(debtDefinitions)) {
      if (!parasset.isUnlocked) continue;
      debts.push({
        ...debtInfo,
        address: config.deployments[debtInfo.contract].address,
        mortgagePoolContract: parasset.contracts[debtInfo.contract],
        mortgageToken: parasset.externalTokens[debtInfo.depositTokenName],
        uToken: parasset.externalTokens[debtInfo.earnTokenName],
      });
    }

    setItanks(debts);
  }, [parasset, parasset?.isUnlocked, setItanks]);

  useEffect(() => {
    if (parasset) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch Itanks: ${err.stack}`)
      );
    }
  }, [parasset, parasset?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ debts }}>{children}</Context.Provider>;
};

export default Debts;
