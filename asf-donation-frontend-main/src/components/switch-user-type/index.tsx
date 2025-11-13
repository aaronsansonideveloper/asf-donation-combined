import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 110,
  height: 36,
  padding: 0,
  borderRadius: '18px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    transform: 'translateX(-3px)',
    fontSize: '15px',
    '& .MuiSwitch-input': {
      left: '-110px',
      width: 220,
    },
    '&.Mui-checked': {
      transform: 'translateX(71px)',
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        content: '"partner"',
        left: '-63px',
        position: 'relative',
        bottom: '-3px',
        color: '#ffffff',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#373b38' : '#373b38',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '& .MuiSwitch-thumb:before': {
      content: '"user"',
      left: '45px',
      position: 'relative',
      color: '#3e423f',
      bottom: '-3px',
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#363937',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 33,
    height: 33,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default IOSSwitch;
