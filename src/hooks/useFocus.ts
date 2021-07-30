//@ts-nocheck
import { useCallback } from "react";
const useFocus = () => {
  const onFocus = useCallback((e, setVal) => {
    setVal("");
  }, []);
  return { onFocus };
};

export default useFocus;
