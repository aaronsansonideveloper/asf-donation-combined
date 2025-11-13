'use client';

import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { useFlatInject } from 'src/service';

type Props = {
  children: React.ReactNode;
};

export default function MessageProvider({ children }: Props) {
  const { isShowUpgradeModal, setIsShowUpgradeModal } = useFlatInject('appStore', {
    isShowUpgradeModal: 'IN',
  });
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
}
