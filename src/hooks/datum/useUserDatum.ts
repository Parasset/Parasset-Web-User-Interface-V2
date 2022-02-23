//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useParasset from "../useParasset";
import { useBlockNumber } from "../../state/application/hooks";

const useUserDatum = ({ activeUsersValue, newUsersValue }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  const parasset = useParasset();
  const block = useBlockNumber();

  const fetchActiveUsers = useCallback(async () => {
    const activeUsers = await parasset.getActiveUsers(activeUsersValue);
    setActiveUsers(activeUsers);
  }, [parasset, activeUsersValue]);

  const fetchNewUsers = useCallback(async () => {
    const newUsers = await parasset.getNewUsers(newUsersValue);
    setNewUsers(newUsers);
  }, [parasset, newUsersValue]);

  useEffect(() => {
    if (parasset) {
      fetchActiveUsers();
      fetchNewUsers();
    }
  }, [parasset, block, activeUsersValue, newUsersValue]);

  return { activeUsers, newUsers, fetchActiveUsers, fetchNewUsers };
};

export default useUserDatum;
