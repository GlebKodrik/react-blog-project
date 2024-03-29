import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import cls from 'classnames';
import { TModalProps } from './types';
import styles from './modal.module.scss';
import Portal from '../portal';

const ANIMATION_TIMEOUT = 300;

const Modal: React.FC<TModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const onCloseModal = () => {
    setIsClosing(true);

    timeoutRef.current = setTimeout(() => {
      setIsClosing(false);
      setIsOpenModal(false);
      onClose();
    }, ANIMATION_TIMEOUT);
  };

  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCloseModal();
    }
  };

  const onContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      setIsOpenModal(true);
      window.addEventListener('keydown', onKeyDownHandler);
    }

    if (!isOpen && isOpenModal) {
      onCloseModal();
    }

    return () => {
      window.removeEventListener('keydown', onKeyDownHandler);
      clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  if (!isOpenModal) {
    return null;
  }

  return (
    <Portal>
      <div
        className={cls(
          styles.modal,
          {
            [styles.opened]: isOpenModal,
            [styles.closing]: isClosing,
          },
          className,
        )}
      >
        <div className={cls(styles.overlay)} onMouseDown={onCloseModal}>
          <div className={cls(styles.content)} onMouseDownCapture={onContentClick}>
            { children }
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
