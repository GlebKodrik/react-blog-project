import React, { useMemo } from 'react';

import cls from 'classnames';
import { TProps } from './types';
import styles from './alert.module.scss';
import { Button } from '../button';
import { Icon } from '../icon';
import { useAlertWithTimer } from './hooks/use-alert-with-timer';
import { DEFAULT_TIME_IN_SECONDS_CLOSING_ALERT } from './constants';
import Portal from '../portal';

export const Alert: React.FC<TProps> = ({
  severity,
  onClose,
  children,
  autoClose = false,
  isOpen = false,
  isPopUp = false,
  autoHideDuration = DEFAULT_TIME_IN_SECONDS_CLOSING_ALERT,
}) => {
  const {
    showAlert,
    startTimerForAutoCloseAlert,
    stopTimerForAutoCloseAlert,
    clearTimerForAutoCloseAlert,
  } = useAlertWithTimer({
    autoHideDuration,
    autoClose,
    closeAlert: onClose,
  });

  const onAlertClose = () => {
    onClose();
    clearTimerForAutoCloseAlert();
  };

  const classes = useMemo(() => ({
    [styles[`severity-${severity}`]]: Boolean(severity),
  }), [severity, isOpen]);

  const onMouseOverAlert = () => {
    stopTimerForAutoCloseAlert();
  };

  const onMouseOutAlert = () => {
    startTimerForAutoCloseAlert();
  };

  const renderBody = () => {
    const alertElement = (
      <div
        className={cls(styles.alert, classes)}
        onMouseOver={onMouseOverAlert}
        onMouseOut={onMouseOutAlert}
      >
        <div className={styles.iconWithChildren}>
          <Icon name="check-circle-outline" fill="#fff" />
          { children }
        </div>
        {onClose && (
        <Button onClick={onAlertClose} className={styles.buttonClose}>
          <Icon name="close-circle-outline" fill="#fff" />
        </Button>
        )}
      </div>
    );
    return isPopUp
      ? (
        <Portal propIdNameElement="alert">
          { alertElement }
        </Portal>
      )
      : alertElement;
  };

  if (!isOpen || !showAlert) {
    return null;
  }

  return (
    <>
      { renderBody() }
    </>
  );
};
