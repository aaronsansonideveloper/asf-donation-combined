import { Button, styled } from '@mui/material';
import { PropsWithChildren } from 'react';
import { PublicSansFont } from 'src/common/styles/font';
import { useResponsive } from 'src/muiEazy';
import { useFlatInject } from 'src/service';

const Btn = styled(Button)(() => {
  return {
    borderRadius: '8px',
    color: '#14417D',
    textAlign: 'center',
    fontFamily: PublicSansFont.style.fontFamily,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '24px' /* 171.429% */,
    border: '1px solid var(--Scaling-Yellow, #FFD600)',
    background:
      'linear-gradient(332deg, rgba(255, 199, 79, 0.38) 14.73%, rgba(255, 214, 0, 0.38) 81.51%)',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  };
});

const UpgradeBtn = ({ children }: PropsWithChildren) => {
  const mdUp = useResponsive('up', 'md');
  const { setIsShowUpgradeModal } = useFlatInject('appStore', {
    isShowUpgradeModal: 'IN',
  });
  return (
    <Btn
      onClick={() => {
        setIsShowUpgradeModal(true);
      }}
      variant="contained"
      startIcon={mdUp ? <img src={'/assets/nav/ic_round-diamond.svg'} /> : ''}
      size={mdUp ? 'medium' : 'small'}
      sx={
        mdUp
          ? {}
          : {
              fontSize: '10px',
            }
      }
    >
      {children}
    </Btn>
  );
};

export default UpgradeBtn;
