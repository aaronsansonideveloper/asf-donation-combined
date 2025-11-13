// import 'src/muiEazy/dist/style.css';
import MotionLazy from 'src/components/animate/motion-lazy';
import { LoadingSign } from 'src/components/LoadingSign';
import MessageProvider from 'src/components/message';
import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import 'src/global.css';
import { LocalizationProvider } from 'src/locales';
import ModalProvider from 'src/providers/modalProvider';
import NotificationProvider from 'src/service/notificationProvider';
import ServiceProvider from 'src/service/serviceProvider';
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'AaronS',
  description: '',
  keywords: '',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/assets/logo-asf-white.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/logo-asf-white.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/logo-asf-white.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/assets/logo-asf-white.png',
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <head></head>
      <body>
        <ServiceProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <ProgressBar />
                  <LoadingSign />
                  <SettingsDrawer />
                  <ModalProvider>
                    <MessageProvider>{children}</MessageProvider>
                  </ModalProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}
