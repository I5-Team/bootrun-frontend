import { createContext, useContext, useState, type ReactNode } from 'react';
import ComingSoonModal from '../components/ComingSoonModal';

type ModalType = 'COMING_SOON' | null;

interface ModalContextType {
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<ModalType>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (type: ModalType) => {
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        // 애니메이션 등을 위해 잠시 후 null 처리 할 수도 있지만, 여기선 바로 닫음
        setTimeout(() => setModalType(null), 200);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {/* 전역 모달 렌더링 영역 */}
            {modalType === 'COMING_SOON' && (
                <ComingSoonModal isOpen={isOpen} onClose={closeModal} />
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
