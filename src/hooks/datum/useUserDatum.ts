//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useUserDatum = ({ activeUsersValue, newUsersValue }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  const basisCash = useParasset();
  const block = useBlockNumber();

  const fetchActiveUsers = useCallback(async () => {
    const activeUsers = await basisCash.getActiveUsers(activeUsersValue);
    setActiveUsers(activeUsers);
  }, [basisCash, activeUsersValue]);

  const fetchNewUsers = useCallback(async () => {
    const newUsers = await basisCash.getNewUsers(newUsersValue);
    setNewUsers(newUsers);
  }, [basisCash, newUsersValue]);

  useEffect(() => {
    if (basisCash) {
      fetchActiveUsers();
      fetchNewUsers();
    }
  }, [basisCash, block, activeUsersValue, newUsersValue]);

  return { activeUsers, newUsers, fetchActiveUsers, fetchNewUsers };
};

export default useUserDatum;
