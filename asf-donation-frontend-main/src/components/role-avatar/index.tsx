import { Avatar, Box } from '@mui/material';
import { SxProps } from '@mui/system';
import { CSSProperties, useEffect } from 'react';
import { useFlatInject } from 'src/service';
import { RoleName } from 'src/service/stores/authStore/model';
import { number } from 'yup';

export interface RoleAvatarProps {
  sx: SxProps;
  signSx?: CSSProperties;
  imgUrl: string;
  userId?: any;
  roleName?: RoleName;
}
export const RoleAvatar = ({
  signSx = {},
  userId,
  sx,
  imgUrl,
  roleName = 'free',
}: RoleAvatarProps) => {
  const { queryUsersBaseInfoAct } = useFlatInject('authStore', {});

  useEffect(() => {
    userId &&
      queryUsersBaseInfoAct({
        ids: [userId],
      });
  }, [userId]);

  const config = {
    pro: {
      color: '#E6C300',
      icon: '/assets/icons/role/pro_sign.png',
    },
    premium: {
      color: '#256CCB',
      icon: '/assets/icons/role/premium_sign.png',
    },
    free: {
      color: '',
      icon: '',
    },
  }[roleName];
  const sxProps = {
    width: 90,
    height: 90,
    ...sx,
    border: config.color ? '3px solid ' + config.color : '',
  };
  return (
    <Box
      sx={{
        position: 'relative',
        marginRight: '10px',
        width: sxProps.width,
      }}
    >
      <Avatar src={imgUrl} sx={sxProps} />
      {config.icon && (
        <img
          style={{
            position: 'absolute',
            right: '0px',
            bottom: '0px',
            width: '22px',
            ...signSx,
          }}
          src={config.icon}
        />
      )}
    </Box>
  );
};
