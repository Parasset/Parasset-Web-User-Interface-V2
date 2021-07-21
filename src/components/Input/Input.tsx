//@ts-nocheck
import React from "react";
import styled from "styled-components";

export interface InputProps {
  endAdornment?: React.ReactNode;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  value: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  onChange,
  onBlur,
  placeholder,
  value,
  type,
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      onBlur={(e)=>{
        onBlur&&onBlur(e)
      }}
    />
  );
};

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  text-align: right;
  font-size: 12px;
  margin: 0;
  padding: 0;
`;

export default Input;
