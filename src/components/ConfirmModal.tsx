import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import BaseModal from './BaseModal';
import theme from '@/styles/theme';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: string;
    subMessage?: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = '알림',
    message,
    subMessage,
    confirmText = '확인',
    cancelText = '취소',
    isDestructive = false,
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            zIndex={theme.zIndex.confirmModal}
            footer={
                <FooterContainer>
                    <Button variant="outline" size="md" onClick={onClose}>
                        {cancelText}
                    </Button>
                    {isDestructive ? (
                        <DestructiveButton size="md" onClick={handleConfirm}>
                            {confirmText}
                        </DestructiveButton>
                    ) : (
                        <Button variant="primary" size="md" onClick={handleConfirm}>
                            {confirmText}
                        </Button>
                    )}
                </FooterContainer>
            }
        >
            <ContentContainer>
                <Message>{message}</Message>
                {subMessage && <SubMessage>{subMessage}</SubMessage>}
            </ContentContainer>
        </BaseModal>
    );
};

export default ConfirmModal;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const ContentContainer = styled.div`
  min-width: 28rem;
  padding: 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Message = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surface};
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const SubMessage = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray400};
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const DestructiveButton = styled(Button)`
  background-color: #ef4444; // 임시 색상 (Theme에 alert가 없다면)
  border-color: #ef4444;
  color: #ffffff;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background-color: #dc2626; // 더 어두운 빨간색
    border-color: #dc2626;
  }
`;
