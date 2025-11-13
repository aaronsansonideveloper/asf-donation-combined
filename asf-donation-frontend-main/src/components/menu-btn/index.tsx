import { Avatar, Fade, Button, Paper } from '@mui/material';
import Portal from '@mui/material/Portal';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useBoolean } from 'src/common/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useFlatInject } from 'src/service';
import Nav from './nav';
export const StyledMenu = styled(Paper)(({ theme }) => ({
  top: 62,
  width: '120',
  right: 200,
  borderRadius: 15,
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  boxShadow: theme.customShadows.dialog,
  backgroundColor: theme.palette.background.default,
}));
export default function BasicMenu() {
  const router = useRouter();
  const { token, userInfo } = useFlatInject('authStore');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuOpen = useBoolean();
  const handleOpenMenuEx = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!token) return;
      setAnchorEl(event.currentTarget);
      menuOpen.onTrue();
    },
    [menuOpen]
  );
  const handleOpenMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      menuOpen.onTrue();
    },
    [menuOpen]
  );

  return (
    <div>
      <Button
        onMouseEnter={handleOpenMenuEx}
        onMouseLeave={menuOpen.onFalse}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => {
          if (!token) {
            router.push(paths.loginCover);
          }
        }}
        sx={{
          height: 40,
        }}
        startIcon={
          <Avatar
            sx={{
              fontSize: 32,
              backgroundColor: 'white',
              color: '#14417D',
            }}
          />
        }
      >
        {userInfo ? 'My account' : 'Login'}
      </Button>
      {userInfo && menuOpen.value && (
        <Portal>
          <Fade in={menuOpen.value}>
            <StyledMenu
              style={{
                top: anchorEl?.getBoundingClientRect().top! + 40,
                right: window.innerWidth - anchorEl?.getBoundingClientRect().left! - 130,
              }}
              id="basic-menu"
              onMouseEnter={handleOpenMenu}
              onMouseLeave={menuOpen.onFalse}
            >
              <Nav open={menuOpen.value} onClose={menuOpen.onFalse} />
            </StyledMenu>
          </Fade>
        </Portal>
      )}
    </div>
  );
}
