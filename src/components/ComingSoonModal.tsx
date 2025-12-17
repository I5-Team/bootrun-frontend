import React from 'react';
import Button from './Button';
import BaseModal from './BaseModal';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Coming Soon"
            footer={
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button size="md" onClick={onClose} fullWidth>
                        확인
                    </Button>
                </div>
            }
        >
            <div
                style={{
                    minWidth: '24rem',
                    textAlign: 'center',
                    padding: '1rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    alignItems: 'center',
                }}
            >
                <p
                    style={{
                        fontSize: '1.6rem',
                        fontWeight: 600,
                        lineHeight: 1.5,
                        color: '#1e293b', // slate-800
                        margin: 0,
                    }}
                >
                    준비중인 기능입니다.
                </p>
            </div>
        </BaseModal>
    );
};

export default ComingSoonModal;
