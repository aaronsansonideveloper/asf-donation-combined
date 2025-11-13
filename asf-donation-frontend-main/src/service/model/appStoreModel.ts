export interface FileUploadApiRequest {
  content_type: string;
  file_name: string;
  file_size: number;
  id: number | string;
  type: FileType;
  file?: File;
}

export enum FileType {
  CompanyBanner = 'COMPANY_BANNER',
  CompanyGallery = 'COMPANY_GALLERY',
  CompanyLogo = 'COMPANY_LOGO',
  CompanyVideo = 'COMPANY_VIDEO',
  OpportunityPic = 'OPPORTUNITY_PIC',
  DealPic = 'DEAL_PIC',
  UserAvatar = 'USER_AVATAR',
}

export interface FileUploadApiRespone {
  // 资源路径
  fileUrl: string;
  // 上传路径
  presignedUrl: string;
}
//----------------------------------
