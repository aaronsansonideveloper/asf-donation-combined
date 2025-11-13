import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { useBoolean } from 'src/common/hooks/use-boolean';
import { Iconify } from 'src/muiEazy';
import Image from 'next/image';
import icon_search from 'src/assets/button.png';
import { IconButton } from '@mui/material';
// ----------------------------------------------------------------------

const StyledSearchbar = styled('div')(({ theme }) => ({
  width: '774px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 3),
  boxShadow: theme.customShadows.z8,
  borderRadius: '8px',
  border: '1px solid var(--DD-Gold, #BD9D4D)',
  background: '#282828',
}));

// ----------------------------------------------------------------------

type SearchbarProps = {
  sx?: SxProps<Theme>;
  handleSearch?: () => void;
};

export default function SearchBarCommon({ sx, handleSearch }: SearchbarProps) {
  const searchOpen = useBoolean();

  return (
    <StyledSearchbar>
      <Input
        autoFocus
        fullWidth
        disableUnderline
        placeholder="Search…"
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="carbon:search" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
      />
      <IconButton
        onClick={() => {
          handleSearch?.();
        }}
      >
        <Image src={icon_search} alt="" />
      </IconButton>
    </StyledSearchbar>
  );
}
