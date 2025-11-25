'use client';

// Deprecated
import LoadingButton from '@mui/lab/LoadingButton';
import { AppBar, InputLabel, MenuItem, Select, Stack, Toolbar, Typography } from '@mui/material';
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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import { useState } from 'react';
import {referrals} from "./clients";
import useIsMobile from "../common/hooks/useIsMobile";

// const referrals = [
//   { label: 'Avarile', referral: 'Avarie Wang' },
//   { label: 'Sparutus', referral: 'Sparutus Cheng' },
//   { label: 'Tester', referral: 'Tester name' },
// ];

interface IDonationInfo {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  group: string | null;
  referralName: string | null;
}

export default function LoginCoverView() {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  // passing along the utm params
  const UTMInSession = utmProcessor.getUTMFromSession();
  const params_utf = UTMInSession ? UTMInSession : utmProcessor.getUTM();
  utmProcessor.setUTMToSession(params_utf);

  const isMobile = useIsMobile();

  const { loading } = useFlatInject('authStore', {
    loading: 'IN',
  });

  const [donationInfo, setDonationInfo] = useState<IDonationInfo>({
    firstName: null,
    lastName: null,
    email: null,
    group: null,
    referralName: null,
  });

  const handleSubmit = async () => {
    const { firstName, lastName, email, group, referralName } = donationInfo;

    if (!firstName || !lastName || !email || !group || !referralName) {
      notify.error('Please fill in all required fields.');
      return;
    }

    const response = await http.request({
      url: 'api/donation/create-session',
      method: 'POST',
      data: {
        email: donationInfo.email,
        first_name: donationInfo.firstName,
        last_name: donationInfo.lastName,
        referral_name: donationInfo.referralName,
        group_id: donationInfo.group,
      },
    });

    console.log(response);
    notify.success('Success!');

    window.open(response.data.data.url, '_blank', 'noopener,noreferrer');
  };

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
      {loading && <SplashScreen />}

      <Stack spacing={2}>
        <TextField
          sx={{ width: isMobile ? "100%" : 300 }}
          label="First Name"
          onChange={(event) => {
            setDonationInfo({
              ...donationInfo,
              firstName: event.target.value,
            });
          }}
        />

        <TextField
          sx={{ width: isMobile ? "100%" : 300 }}
          label="Last Name"
          onChange={(event) => {
            setDonationInfo({
              ...donationInfo,
              lastName: event.target.value,
            });
          }}
        />

        <TextField
          sx={{ width: isMobile ? "100%" : 300 }}
          label="Email"
          onChange={(event) => {
            setDonationInfo({
              ...donationInfo,
              email: event.target.value,
            });
          }}
        />

        <InputLabel id="demo-simple-select-label">Group Selection</InputLabel>
        <Select
          label="Group"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={donationInfo.group}
          sx={{ width: isMobile ? "100%" : 300 }}
          onChange={(event) => {
            setDonationInfo({
              ...donationInfo,
              group: event.target.value,
            });
          }}
        >
          <MenuItem value={1}>Group - 1</MenuItem>
          <MenuItem value={2}>Group - 2</MenuItem>
          <MenuItem value={3}>Group - 3</MenuItem>
          <MenuItem value={4}>Group - 4</MenuItem>
          <MenuItem value={5}>Group - 5</MenuItem>
          <MenuItem value={6}>Group - 6</MenuItem>
          <MenuItem value={7}>Group - 7</MenuItem>
          <MenuItem value={8}>Group - 8</MenuItem>
          <MenuItem value={9}>Group - 9</MenuItem>
          <MenuItem value={10}>Group - 10</MenuItem>
          <MenuItem value={11}>Group - 11</MenuItem>
          <MenuItem value={12}>Group - 12</MenuItem>
          <MenuItem value={13}>Group - 13</MenuItem>
          <MenuItem value={14}>Group - 14</MenuItem>
        </Select>

        <Autocomplete
          disablePortal
          options={referrals}
          sx={{ width: isMobile ? "100%" : 300 }}
          renderInput={(params) => <TextField {...params} label="Referral Name" />}
          onChange={(event: any, newValue: { label: string; referral: string } | null) => {
            setDonationInfo({
              ...donationInfo,
              referralName: newValue?.referral as string,
            });
          }}
        />

        <LoadingButton
          sx={{ width: 300 }}
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </LoadingButton>
      </Stack>

      {loading && <SplashScreen />}
    </AuthCoverLayout_v2>
  );
}
