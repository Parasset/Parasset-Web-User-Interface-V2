//@ts-nocheck
import React, { useMemo } from "react";
import BigNumber from "bignumber.js";

export default function FormatValue({
  value,
  decimals = 3,
  placeholder,
  showAll,
  prefix,
  suffix,
}) {
  const formatValue = useMemo(() => {
    return parseFloat(value)
      ? showAll
        ? new BigNumber(value).toFormat()
        : new BigNumber(value).toFormat(decimals)
      : placeholder
      ? "-"
      : value;
  }, [value, decimals, placeholder]);
  return (
    <>
      {" "}
      {prefix}
      {formatValue}
      {suffix}
    </>
  );
}
