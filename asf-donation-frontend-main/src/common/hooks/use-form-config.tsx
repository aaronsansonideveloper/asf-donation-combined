// import * as Yup from 'yup';
// import { RHFTextField, RHFSelect } from 'src/components/hook-form';
// import { MenuItem } from '@mui/material';
// import { useMemo } from 'react';

// interface FormConfigItem {
//   type?: 'string' | 'select';
//   schema?: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>;
//   defaultValue?: unknown;
//   name?: string;
//   label?: string;
//   group?: string;
//   isHidden?: boolean;
//   fieldConfig?: {};
//   config?: {
//     options?: string[] | { key: string; value: string; label: string }[];
//   };
// }

// const useFormConfig = <FormKey extends keyof FormConfigItem>(fromConfig: {[key:string]:FormConfigItem}) => {
//   const config = useMemo<
//     Partial<{
//       [key in FormKey]: FormConfigItem;
//     }>
//   >(() => fromConfig, []);
//   return (
//     <>
//       {Object.entries(fromConfig).map(([key, item]) => {
//         const { isHidden, group, type, name = key, label = key, config } = item;
//         if (isHidden || group) return;
//         if (type == 'select') {
//           return (
//             <RHFSelect name={name} label={label} key={key}>
//               {config?.options?.map((item) => {
//                 return (
//                   <MenuItem
//                     key={typeof item == 'string' ? item : item.key}
//                     value={typeof item == 'string' ? item : item.value}
//                   >
//                     {typeof item == 'string' ? item : item.label}
//                   </MenuItem>
//                 );
//               })}
//             </RHFSelect>
//           );
//         }
//         return <RHFTextField name={name} label={label} key={key} />;
//       })}
//       {/*  */}
//     </>
//   );
// };

// export default useFormConfig;
