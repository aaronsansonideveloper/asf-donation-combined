import Box from '@mui/material/Box';
import { useResponsive } from 'src/common/hooks/use-responsive';
import SwiperImg from './swiperImg';
import { Stack } from '@mui/system';
import Image from 'next/image';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type AuthCarouselProps = {
  children: React.ReactNode;
};

function AuthCoverLayout_v2({ children }: AuthCarouselProps) {
  const mdUp = useResponsive('up', 'md');

  return (
    <Stack
      sx={{
        height: '100vh',
      }}
    >
      <Stack
        sx={{
          height: '120px',
          background: 'black',
          padding: '0 30px',
        }}
        justifyContent={'center'}
      >
        <Image src={'/assets/logo-asf-white.png'} alt="" width={350} height={76} />
      </Stack>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          sx={{
            mx: 'auto',
            flexShrink: 0,
            py: { xs: 5, md: 8 },
            px: { xs: 2, md: 10 },
            width: { xs: 1, md: 480 },
            overflow: 'auto',
          }}
        >
          {children}
        </Box>

        {mdUp && (
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              position: 'relative',
              bgcolor: 'common.black',
            }}
          >
            <SwiperImg />
          </Box>
        )}
      </Box>
      <Stack
        sx={{
          padding: '12px 0px',
          height: mdUp ? '100px' : '220px',
          background: 'black',
          color: 'white',
          alignItems: 'center',
        }}
        direction={mdUp ? 'row' : 'column'}
        justifyContent={'space-evenly'}
        spacing={'10px'}
      >
        <Typography>©Aaron Sansani Group International Pty Ltd</Typography>
        <Image
          style={{
            position: 'relative',
            bottom: '10px',
          }}
          src={'/assets/AaronS-White-Logo.webp'}
          alt=""
          width={mdUp ? 350 : 150}
          height={mdUp ? 76 : 30}
        />
        <Typography>84 - 88 Montague Street,South Melbourne,Victoria,3205</Typography>
      </Stack>
    </Stack>
  );
}

export default AuthCoverLayout_v2;
