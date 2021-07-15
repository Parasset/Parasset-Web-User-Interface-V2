//@ts-nocheck
import { useContext } from "react";
import { Context as ItanksContext } from '../../contexts/ITanks';
const useItank = (contractName)  => {
  const { itanks } = useContext(ItanksContext);

  if (itanks.length) {
    return itanks.find((item) => item.contract === contractName);
  } else {
    return {
      name: "USDT-PUSD",
      icon1: "USDT",
      icon2: "PUSD",
      contract: "PUSDInsPool",
      depositTokenName: "USDT",
      earnTokenName: "PUSD",
    };
  }
};

export default useItank;
