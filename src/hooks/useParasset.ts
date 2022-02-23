import { useContext } from "react";
import { Context } from "../contexts/ParassetProvider";

const useParasset = () => {
  const { parasset } = useContext(Context);
  return parasset;
};

export default useParasset;
