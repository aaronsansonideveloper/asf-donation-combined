import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Iconify } from 'src/muiEazy';

export const TextFieldTooltip = (props: { text: string }) => {
  return (
    <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
      <Iconify icon={'ri:information-fill'} />
      <Typography
        fontFamily={'secondaryFont.style.fontFamily'}
        fontSize={'12px'}
        lineHeight={'12x'}
        fontWeight={400}
        textAlign={'center'}
        color={'#59745D'}
      >
        {props.text}
      </Typography>
    </Stack>
  );
};
