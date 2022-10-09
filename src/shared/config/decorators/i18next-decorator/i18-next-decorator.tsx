import { Story } from '@storybook/react';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18next/i18next';
import Loader from '../../../ui/loader';

export const I18NextDecorator = (StoryComponent: Story) => (
  <Suspense fallback={<Loader />}>
    <I18nextProvider i18n={i18n}>
      <StoryComponent />
    </I18nextProvider>
  </Suspense>
);