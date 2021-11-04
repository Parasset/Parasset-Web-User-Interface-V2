//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useUserDatum = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchActiveUsers = useCallback(async () => {
    const activeUsers = await basisCash.getActiveUsers();
    console.log("🚀 ~ file: useUserDatum.ts ~ line 13 ~ fetchActiveUsers ~ activeUsers", activeUsers)
    setActiveUsers(activeUsers);
   
  }, [basisCash]);

  useEffect(() => {
    if (basisCash) {
      fetchActiveUsers();
    }
  }, [basisCash, block]);

  return { activeUsers, fetchActiveUsers };
};

export default useUserDatum;
