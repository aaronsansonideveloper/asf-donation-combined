'use client';
import { Dialog, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { PropsWithChildren } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CloseIcon } from 'src/components/lightbox';
import { useResponsive } from 'src/muiEazy';
import { dp, useFlatInject } from 'src/service';

const ModalProvider = (props: PropsWithChildren) => {
  const { showModalType, setShowModalType } = useFlatInject('appStore');
  const isMobile = useResponsive('down', 'md');
  const handleClose = () => {
    dp('dealStore', 'setUserDealList', []);
    setShowModalType({
      type: '',
      data: {},
    });
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>

      <div>
        <Dialog
          onClose={handleClose}
          open={!!showModalType}
          maxWidth={false}
          sx={{
            width: '100%',
            outline: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& .MuiPaper-root.MuiDialog-paper': {
              borderRadius: '32px',
              maxWidth: 'initial',
              ...(isMobile ? { width: '100%', margin: '12px' } : {}),
            },
            '& .MuiDialog-container': {
              ...(isMobile ? { width: '100%' } : {}),
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              zIndex: 10,
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          ></Box>
        </Dialog>
      </div>
    </>
  );
};

export default ModalProvider;
