import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import { useFlatInject } from 'src/service';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, sx }: LogoProps) {
  const singleLogo = (
    <Box
      component={'img'}
      src={'/assets/logo-asf-white.png'}
      sx={{
        width: '40px',
        height: '40px',
      }}
    />
  );

  const fullLogo = (
    <Box
      component={'img'}
      src={'/assets/logo-asf-white.png'}
      sx={{
        padding: '10px',
        borderRadius: '12px',
        background: 'black',
      }}
    />
  );

  // todo: the router needs change for before the after login, the behavior is different
  return (
    <Link
      component={RouterLink}
      href={'/'}
      color="inherit"
      aria-label="Aaron Sanoni Foundation"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 102 : 144,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {single ? singleLogo : fullLogo}
      </Box>
    </Link>
  );
}

export default memo(Logo);
