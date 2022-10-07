import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import PageError from '../../../widgets/page-error';
import Loader from '../../../shared/ui/loader';

type TErrorProps = {
  children: ReactNode;
};

type TErrorStateProps = {
  hasError: ReactNode;
};

class ErrorBoundary extends React.Component<TErrorProps, TErrorStateProps> {
  constructor(props: TErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Suspense fallback={<Loader />}>
          <PageError />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;