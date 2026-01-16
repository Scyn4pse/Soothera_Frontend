import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ConfirmationModal, ConfirmationModalProps } from './ConfirmationModal';
import { Ionicons } from '@expo/vector-icons';

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

interface ConfirmationModalContextType {
  showConfirmation: (options: ConfirmationOptions) => Promise<boolean>;
}

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error('useConfirmation must be used within ConfirmationModalProvider');
  }
  return context;
};

interface ConfirmationModalProviderProps {
  children: ReactNode;
}

export const ConfirmationModalProvider: React.FC<ConfirmationModalProviderProps> = ({ children }) => {
  const [modalProps, setModalProps] = useState<ConfirmationModalProps & { visible: boolean }>({
    visible: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const showConfirmation = useCallback((options: ConfirmationOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
      setModalProps({
        visible: true,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        confirmButtonColor: options.confirmButtonColor,
        icon: options.icon,
        iconColor: options.iconColor,
        onConfirm: () => {
          setModalProps((prev) => ({ ...prev, visible: false }));
          resolve(true);
          setResolvePromise(null);
        },
        onCancel: () => {
          setModalProps((prev) => ({ ...prev, visible: false }));
          resolve(false);
          setResolvePromise(null);
        },
      });
    });
  }, []);

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation }}>
      {children}
      <ConfirmationModal {...modalProps} />
    </ConfirmationModalContext.Provider>
  );
};
