import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InterFont, PublicSansFont } from 'src/common/styles/font';

export const NameLabel = styled(Typography)(() => {
  return {
    color: '#256CCB',
    fontFamily: InterFont.style.fontFamily,
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '48px',
  };
});

export const StatusLabel = styled(Typography)(() => {
  return {
    color: '#696969',
    textAlign: 'center',
    fontFamily: PublicSansFont.style.fontFamily,
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
  };
});

export const TitleLabel = styled(Typography)(() => {
  return {
    color: '#256CCB',
    fontFamily: InterFont.style.fontFamily,
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '28px',
  };
});

export const InfoLabel = styled(Typography)(() => {
  return {
    color: '#141414',
    textAlign: 'center',
    fontFamily: PublicSansFont.style.fontFamily,
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
  };
});

export const LinkLabel = styled(Typography)(() => {
  return {
    color: '#232323',
    fontFamily: PublicSansFont.style.fontFamily,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '22px',
  };
});

export const InfoCard = styled(Box)(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    padding: '11px 22px',
    borderRadius: '8px',
    background: 'rgba(145, 158, 171, 0.08)',
  };
});

export const TimeLabel = styled(Typography)(() => {
  return {
    color: '#256CCB',
    textAlign: 'center',
    /* Desktop/Caption */
    fontFamily: PublicSansFont.style.fontFamily,
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
  };
});
export const CardLabel = styled(Typography)(() => {
  return {
    color: '#141414',
    textAlign: 'center',
    /* Desktop/Body2 */
    fontFamily: PublicSansFont.style.fontFamily,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '22px',
  };
});
