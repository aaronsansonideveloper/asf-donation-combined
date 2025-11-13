/* Instruments */
import { FileUploadApiRequest } from 'src/service/model/appStoreModel';
import { createThunks } from 'src/service/setup';
import httpApi from './api';

const thunks = createThunks('appStore', {
  getUploadUrlAct: async (arg: FileUploadApiRequest) => {
    const { file, ...rest } = arg;
    const { data } = await httpApi.getUploadUrlApi(rest);
    console.log('data', data);
    const { fileUrl, presignedUrl } = data.content;

    console.log('fileUrl', fileUrl, 'presignedUrl', presignedUrl);
    await httpApi.fileUploadApi(presignedUrl, file!);
    return { presignedUrl, fileUrl };
  },
});
export default thunks;
