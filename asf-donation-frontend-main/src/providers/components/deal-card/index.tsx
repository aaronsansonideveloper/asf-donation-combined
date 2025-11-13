'use client';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import NProgress from 'nprogress';
import { memo } from 'react';
import Image from 'src/components/image';
import { useBoolean } from 'src/common/hooks/use-boolean';
import { Iconify, useResponsive } from 'src/muiEazy';
import { useRouter } from 'src/routes/hooks';
import { useFlatInject } from 'src/service';
import { primaryFont } from 'src/theme/typography';
import { DealEntity } from 'src/types/deal';
import { TitleLabel } from '..';
import { returnTypeBasedOnDealType } from './deal-landing-item';
import Sharebtn from './share-btn';

// ----------------------------------------------------------------------

type Props = {
  deal: DealEntity;
};

function DealCard({ deal }: Props) {
  const { id, logo } = deal;
  const { pics } = deal || {};
  const { likeDealAct } = useFlatInject('dealStore');
  const { setShowModalType } = useFlatInject('appStore');
  const liked = useBoolean(deal.liked);
  const router = useRouter();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '270px',
        width: '100%',
        ':hover': {
          boxShadow: '4px 4px 14px 0 rgb(0 0 0 / 5%)',
        },
        cursor: 'pointer',
        borderRadius: '20px',
      }}
      onClick={() => {
        NProgress.start();
        router.push(`/marketplace/deal/${id}`);
        setShowModalType({
          type: '',
        });
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 1.5,
          pl: 2,
          pr: 1.5,
          top: 0,
          width: 1,
          zIndex: 9,
          position: 'absolute',
          height: '40px',
        }}
      >
        <Stack
          fontFamily={primaryFont.style.fontFamily}
          spacing={0.5}
          direction="row"
          alignItems={'center'}
          sx={{
            px: 1,
            borderRadius: 0.75,
            typography: 'subtitle2',
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'text.primary'),
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '20px',
          }}
        >
          {returnTypeBasedOnDealType(deal.type)}
        </Stack>

        <Checkbox
          color="default"
          checked={liked.value}
          onChange={async () => {
            const success = await likeDealAct({
              id,
            });
            if (success) {
              liked.onToggle();
            }
          }}
          onClick={(e) => e.stopPropagation()}
          icon={<Iconify icon="carbon:favorite" />}
          checkedIcon={<Iconify color={'#d85963'} icon="carbon:favorite-filled" />}
          sx={{ color: '#d85963' }}
        />
      </Stack>

      <Image
        sx={{
          height: '117px',
        }}
        alt={deal.title}
        src={pics ? pics[0] : 'N/A'}
        ratio="6/4"
      />
      <Image
        sx={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '60px',
        }}
        src={'/assets/common/overlay_top.svg'}
        ratio="6/4"
      />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          flex: 1,
        }}
      >
        <Stack
          direction={'column'}
          alignSelf={'stretch'}
          spacing={'8px'}
          sx={{ padding: '16px 20px 24px 20px' }}
        >
          <Stack direction={'row'} gap={'8px'} alignSelf={'stretch'}>
            <Avatar
              sx={{
                width: '28px',
                height: '28px',
              }}
              src={logo}
            ></Avatar>
            <TitleLabel
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {deal.title}
            </TitleLabel>
          </Stack>
          <Typography
            fontFamily={primaryFont.style.fontFamily}
            fontSize={'14px'}
            fontStyle={'normal'}
            fontWeight={3500}
            lineHeight={'22px'}
            color={'#59745D'}
            width={'100%'}
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              width: '100%',
            }}
          >
            {deal.overview}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'hidden' }} />

        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            sx={{
              p: 2.5,
            }}
            columnGap={'56px'}
          >
            <Typography
              fontFamily={primaryFont.style.fontFamily}
              sx={{
                px: 1,
                borderRadius: 0.75,
                typography: 'subtitle2',
                bgcolor: 'grey.200',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'text.primary' : 'common.white',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '20px',
                maxWidth: '85%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                wordBreak: 'break-all',
                whiteSpace: 'nowrap',
              }}
            >
              {deal.industry}
            </Typography>
            <Sharebtn deal_id={id}></Sharebtn>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

export default memo(DealCard);
