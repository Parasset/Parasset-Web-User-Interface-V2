import React, { createContext, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import Parasset from "../../abi";
import config from "../../config";

export interface ParassetContext {
  parasset?: Parasset;
}

export const Context = createContext<ParassetContext>({ parasset: null });

export const ParassetProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();

  const [parasset, setParasset] = useState<Parasset>();

  useEffect(() => {
    if (!parasset) {
      const basis = new Parasset(config);
      if (account) {
        // wallet was unlocked at initialization
        basis.unlockWallet(ethereum, account);
      }
      setParasset(basis);
    } else if (account) {
      parasset.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ parasset: parasset }}>{children}</Context.Provider>;
};
