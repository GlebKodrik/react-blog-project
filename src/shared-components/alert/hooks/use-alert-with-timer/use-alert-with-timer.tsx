import { useCallback, useEffect, useState } from 'react';
import { TProps, TReturn } from './types';
import useTimer from '../../../../hooks/use-timer';
import { DEFAULT_ANIMATION_IN_SECONDS } from '../../constants';

const DEFAULT_SECONDS_CLOSE_ALERT = 6;

export const useAlertWithTimer = ({
  autoClose = false,
  autoHideDuration = DEFAULT_SECONDS_CLOSE_ALERT,
}: TProps): TReturn => {
  const {
    seconds,
    startTimer,
    stopTimer,
    clearTimer,
  } = useTimer();

  const [showAlert, setShowAlert] = useState(true);
  const [percentAutoClose, setPercentAutoClose] = useState(0);
  const [onePercent] = useState(100 / autoHideDuration);

  const callsFunctionForAutoClose = useCallback((callback: Function): void => {
    if (autoClose) {
      callback();
    }
  }, [autoClose]);

  const startTimerForAutoCloseAlert = useCallback(() => {
    callsFunctionForAutoClose(startTimer);
  }, [startTimer]);

  const stopTimerForAutoCloseAlert = useCallback(() => {
    if (stopTimer) {
      callsFunctionForAutoClose(stopTimer);
    }
  }, [stopTimer]);

  const clearTimerForAutoCloseAlert = useCallback(() => {
    callsFunctionForAutoClose(clearTimer);
  }, [clearTimer]);

  useEffect(() => {
    startTimerForAutoCloseAlert();
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      setPercentAutoClose(onePercent * seconds);
    }

    if (seconds === autoHideDuration) {
      clearTimerForAutoCloseAlert();
      setPercentAutoClose(100);
      setTimeout(() => {
        setShowAlert(false);
      }, DEFAULT_ANIMATION_IN_SECONDS);
    }
  }, [seconds]);

  return {
    showAlert,
    startTimerForAutoCloseAlert,
    stopTimerForAutoCloseAlert,
    clearTimerForAutoCloseAlert,
    percentAutoClose,
  };
};
