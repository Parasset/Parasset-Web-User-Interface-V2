import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Input, { InputProps } from '../Input';
import { useTranslation } from 'react-i18next';
interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  const { t } = useTranslation();
  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()}
        {t('kytoken', {
          label: symbol,
        })}
      </StyledMaxText>
      <Input
        type="number"
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button size="sm" text={t('zuida')} onClick={onSelectMax} />
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  );
};

const StyledTokenInput = styled.div``;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
  @media (max-width: 768px) {
    width: ${(props) => props.theme.spacing[2]}px;
  }
`;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;

  height: 44px;
  justify-content: flex-end;
`;

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.color.grey[600]};

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export default TokenInput;
