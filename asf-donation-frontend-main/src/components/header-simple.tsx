import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Logo from 'src/components/logo';
import { useOffSetTop } from 'src/common/hooks/use-off-set-top';
import { bgBlur } from 'src/theme/css';
import { HEADER } from 'src/common/layouts/config-layout';
import HeaderShadow from './header-shadow';

// ----------------------------------------------------------------------

export default function HeaderSimple() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Logo />

        {/* <Stack direction="row" alignItems="center" spacing={1}>
          <SettingsButton />

          <Link
            href={paths.support}
            component={RouterLink}
            color="inherit"
            sx={{ typography: 'subtitle2' }}
          >
            Need help?
          </Link>
        </Stack> */}
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
