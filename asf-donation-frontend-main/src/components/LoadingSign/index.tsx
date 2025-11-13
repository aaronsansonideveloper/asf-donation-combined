'use client';

import { SplashScreen } from 'src/components/loading-screen';
import { useFlatInject } from 'src/service';

export const LoadingSign = () => {
  const { loading } = useFlatInject('appStore');
  return <> {loading && <SplashScreen />}</>;
};
