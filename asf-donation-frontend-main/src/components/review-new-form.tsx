import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { FieldText, FormProvider } from 'src/muiEazy';
import notify from 'src/common/utils/notify';
import { useFlatInject } from 'src/service';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onClose: VoidFunction;
}

// ----------------------------------------------------------------------

export default function ReviewNewForm({ onClose, ...other }: Props) {
  const { userInfo } = useFlatInject('authStore');
  const { dealDetail } = useFlatInject('dealStore');
  const { createCommentAct, findByDealIDAct } = useFlatInject('commentStore');

  const defaultValues = {
    review: '',
  };

  const NewReviewSchema = Yup.object().shape({
    review: Yup.string()
      .max(200, 'Comments should less than 200 letters!')
      .required('Review is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (dealDetail) {
        await createCommentAct({
          deal_id: dealDetail?.id,
          content: data.review,
        });
        await findByDealIDAct({
          deal_id: dealDetail?.id,
        });
        reset();
        notify.success('Post review successfully!');
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...other}>
      <FormProvider formRef={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ typography: 'h3', pb: 3 }}>Comment</DialogTitle>

        <DialogContent sx={{ py: 0 }}>
          <Stack spacing={2.5}>
            <FieldText multiline rows={4} name="review" label="Comment" required />
            <FieldText name="name" label="Name" required value={userInfo?.first_name} />
            <FieldText name="email" label="Email address" required value={userInfo?.email} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Cancel
          </Button>
          <LoadingButton color="inherit" type="submit" variant="contained" loading={isSubmitting}>
            Post
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
