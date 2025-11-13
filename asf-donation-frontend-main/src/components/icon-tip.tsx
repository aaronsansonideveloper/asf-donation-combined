import { IconButton, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Iconify } from 'src/muiEazy';
import { ReactNode } from 'react';
import React from 'react';
import useIsMobile from 'src/common/hooks/useIsMobile';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: '600px',
  },
}));

const IconTip = ({ info }: { info: ReactNode }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <Typography color={'#59745D'} fontWeight={500}>
      {info}
    </Typography>
  ) : (
    <LightTooltip placement="right" title={info}>
      <IconButton sx={{ width: '40px', height: '40px', ml: 1 }}>
        <Iconify icon="ri:information-fill" />
      </IconButton>
    </LightTooltip>
  );
};

export default IconTip;
