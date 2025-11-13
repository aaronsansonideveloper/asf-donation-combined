import { Box, Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PublicSansFont } from 'src/common/styles/font';
import { Iconify } from 'src/muiEazy';
import { paths } from 'src/routes/paths';
import { dpChain } from 'src/service';

const Board = styled(Box)(() => {
  return {
    position: 'relative',
    display: 'flex',
    height: '60px',
    padding: '6px 16px',
    alignItems: 'center',
    alignSelf: 'stretch',
    background:
      'linear-gradient(332deg, rgba(157, 188, 220, 0.38) 14.73%, rgba(43, 123, 203, 0.38) 81.51%)',
    boxShadow: ' 0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  };
});

const UpgradeBoard = () => {
  const router = useRouter();
  return (
    <Board
      onClick={() => {
        router.push(paths.payment);
      }}
    >
      <img src={'/assets/nav/ic_round-diamond.svg'} />
      <Typography
        sx={{
          color: '#14417D',
          textAlign: 'center',
          fontFamily: PublicSansFont.style.fontFamily,
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '24px',
          marginLeft: '8px',
        }}
      >
        Upgrade Subscription Now
      </Typography>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          dpChain('appStore').setIsShowUpgrade(false);
        }}
        sx={{
          position: 'absolute',
          right: '0px',
        }}
        startIcon={<Iconify icon={'mdi:close'} />}
      ></Button>
    </Board>
  );
};

export default UpgradeBoard;
