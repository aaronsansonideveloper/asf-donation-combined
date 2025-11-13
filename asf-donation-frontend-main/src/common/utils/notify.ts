import { OptionsObject, enqueueSnackbar } from 'notistack';
const optionPreset: OptionsObject = {
  autoHideDuration: 2000,
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top',
  },
};
const notify = {
  info: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'info' });
  },
  error: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'error' });
  },
  success: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'success' });
  },
  warn: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'warning' });
  },
};

export default notify;
