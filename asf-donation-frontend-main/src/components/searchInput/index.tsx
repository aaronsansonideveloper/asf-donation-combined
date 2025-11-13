import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';
import { Iconify, useResponsive } from 'src/muiEazy';
import { useFlatInject } from 'src/service';

export default function SearchInput({ flag }: { flag: string }) {
  const { setSeachParams, setMarketListPageNum } = useFlatInject('marketStore', {
    searchData: 'IN',
  });
  const mdUp = useResponsive('up', 'md');
  const [searchStr, setSearchStr] = useState('');
  useEffect(() => {
    setSearchStr('');
  }, [flag]);
  return (
    <>
      <InputBase
        onChange={(e) => {
          setSearchStr(e.target.value);
        }}
        value={searchStr}
        fullWidth
        placeholder={mdUp ? 'Search By Keyword or Industry' : 'Search'}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            setSeachParams(searchStr);
            setMarketListPageNum(1);
          }
        }}
        startAdornment={
          <InputAdornment position="start">
            <Iconify width={24} icon="tabler:search" sx={{ color: 'text.disabled', mr: 1 }} />
          </InputAdornment>
        }
        sx={{
          height: 44,
          typography: 'subtitle1',
          color: 'var(--text-disabled, #141414)',
          fontFamily: 'Public Sans',
          weight: 600,
          fontSize: '16px',
          lineHeight: '24px',
        }}
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        sx={{
          padding: '11px 22px 11px 22px',
          minWidth: { xs: '95px', md: '95px' },
          height: '48px',
          borderRadius: '8px',
        }}
        onClick={() => {
          setSeachParams(searchStr);
          setMarketListPageNum(1);
        }}
      >
        Search
      </Button>
    </>
  );
}
