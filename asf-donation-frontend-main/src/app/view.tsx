'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import AuthCoverLayout_v2 from 'src/common/layouts/authLayout_v2';
import SwiperImg from 'src/common/layouts/authLayout_v2/swiperImg';
import FormProvider from 'src/components/hook-form';
import { SplashScreen } from 'src/components/loading-screen';
import Logo from 'src/components/logo';
import { utmProcessor } from 'src/components/utm-processor';
import { http } from 'src/http';
import { notify, useFields, useResponsive } from 'src/muiEazy';
import { useRouter } from 'next/navigation';
import { useFlatInject } from 'src/service';
import * as Yup from 'yup';

export default function LoginCoverView() {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  // passing along the utm params
  const UTMInSession = utmProcessor.getUTMFromSession();
  const params_utf = UTMInSession ? UTMInSession : utmProcessor.getUTM();
  utmProcessor.setUTMToSession(params_utf);

  const { loading } = useFlatInject('authStore', {
    loading: 'IN',
  });

  const { methods, formNode } = useFields(
    {
      firsName: {
        label: 'First name',
        schema: Yup.string().required('First name is required'),
      },
      lastName: {
        label: 'Last name',
        schema: Yup.string().required('Last name is required'),
      },
      email: {
        label: 'Email',
        schema: Yup.string().required('Email is required').email('That is not an email'),
        fieldConfig: {
          required: true,
        },
      },
      group_id: {
        type: 'radio',
        label: 'Group Selection: ',
        defaultValue: '1',
        fieldConfig: {
          required: true,
          options: [
            {
              label: 'Group 1',
              value: '1',
              key: '1',
            },
            {
              label: 'Group 2',
              value: '2',
              key: '2',
            },
            {
              label: 'Group 3',
              value: '3',
              key: '3',
            },
            {
              label: 'Group 4',
              value: '4',
              key: '4',
            },
            {
              label: 'Group 5',
              value: '5',
              key: '5',
            },
          ],
        },
      },
    },
    {
      async onSubmit(props) {
        const isRight = await methods.trigger();
        if (isRight) {
          const response = await http.request({
            url: 'api/donation/create-session',
            method: 'POST',
            data: props,
          });
          console.log(response);
          notify.success('Success!');
          // data.data.url
          window.open(response.data.data.url, '_blank', 'noopener,noreferrer');
        }
      },
      submitRender: (
        <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained">
          Submit
        </LoadingButton>
      ),
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const renderHead = (
    <Stack
      sx={{
        pb: 5,
        pt: { xs: 5, md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Typography variant="h3" sx={{ color: 'common.black' }} paragraph>
        Wealth Immersion
      </Typography>
    </Stack>
  );

  return (
    <AuthCoverLayout_v2>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
      {renderHead}
      {!mdUp && <SwiperImg />}
      {formNode}
      {loading && <SplashScreen />}
    </AuthCoverLayout_v2>
  );
}
