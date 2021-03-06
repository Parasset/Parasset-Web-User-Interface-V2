//@ts-nocheck
import React from "react";
import Toast from "light-toast";
import useCopyClipboard from "../../hooks/useCopyClipboard";
import { useTranslation } from "react-i18next";

export default function CopyHelper({ toCopy }) {
  const [isCopied, setCopied] = useCopyClipboard();
  const { t } = useTranslation();
  return (
    <img
      alt="image"
      onClick={() => {
        setCopied(toCopy);
        Toast.info(t("fzcg"));
      }}
      src={require("../../assets/svg/copy_icon.svg")}
      width="16"
      height="16"
      className="margin-left-10 cursor-pointer"
    />
  );
}
