//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useParasset from "../../hooks/useParasset";
import { Mine } from "../../abi";
import config, { mineDefinitions } from "../../config";

const Mines: React.FC = ({ children }) => {
  const [mines, setMines] = useState<Mine[]>([]);
  const parasset = useParasset();

  const fetchPools = useCallback(async () => {
    const mines: Mine[] = [];

    for (const mineInfo of Object.values(mineDefinitions)) {
      if (!parasset.isUnlocked) continue;
      mines.push({
        ...mineInfo,
        address: config.deployments[mineInfo.contract].address,
        depositToken: parasset.contracts[mineInfo.depositContract],
        earnToken: parasset.externalTokens[mineInfo.earnTokenName],
      });
    }
    setMines(mines);
  }, [parasset, parasset?.isUnlocked, setMines]);

  useEffect(() => {
    if (parasset) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch pools: ${err.stack}`)
      );
    }
  }, [parasset, parasset?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ mines }}>{children}</Context.Provider>;
};

export default Mines;
