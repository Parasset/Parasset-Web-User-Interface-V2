import { useContext } from "react";
import { Context } from "../contexts/ParassetProvider";

const useParasset = () => {
  const { basisCash } = useContext(Context);
  return basisCash;
};

export default useParasset;
