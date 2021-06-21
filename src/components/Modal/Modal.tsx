import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';
export interface ModalProps {
  isOpen?: boolean;
  className?: string;
  children: any;
  onDismiss: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onDismiss, children, className }) => {
  return (
    <>
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={onDismiss} />
          <Container size="sm">
            <StyledModal className={className}>
              <Card>
                <CardContent>{children}</CardContent>
              </Card>
            </StyledModal>
          </Container>
        </StyledModalWrapper>
      )}
    </>
  );
};

const StyledModal = styled.div`
  border-radius: 12px;
  box-shadow: 24px 24px 48px -24px ${(props) => props.theme.color.grey[900]};
  position: relative;
`;
const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`;

const StyledModalBackdrop = styled.div`
  background-color: #00000088;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export default Modal;
