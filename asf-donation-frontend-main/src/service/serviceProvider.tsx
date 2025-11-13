'use client';

import { useEffect } from 'react';
import { Provider } from 'redux-eazy';
import { usePathname, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { reduxStore, useFlatInject } from 'src/service';

export const includePath = [
  paths.loginCover,
  paths.registerCover,
  paths.verify,
  paths.ResendEmailVerification,
  paths.forgotPassword,
  paths.changePassword,
  paths.faqs.root,
  paths.howto.root,
  paths.howto.deal,
  paths.howto.faq,
  paths.howto.terms,
  paths.howto.community,
  paths.howto.policy,
  paths.faqs.generalQuestions,
  paths.about,
  '',
];

const includePath2 = [
  paths.loginCover,
  paths.registerCover,
  paths.verify,
  paths.ResendEmailVerification,
  paths.forgotPassword,
  paths.changePassword,
];

const App = (props: React.PropsWithChildren) => {
  const { token, userInfoMemberAct, getCurrentUserPermissionAct } = useFlatInject('authStore');
  const init = () => {
    userInfoMemberAct();
    getCurrentUserPermissionAct();
  };
  const router = useRouter();
  const pathName = usePathname();

  let pathNameTemp = pathName.endsWith('/') ? pathName.slice(0, -1) : pathName;

//   useEffect(() => {
//     if (token) {
//       init();
//     }
//   }, [token]);

//   useEffect(() => {
//     const shareFlag = pathName.includes('share');
//     if (shareFlag) {
//       return;
//     }
//     if (token) {
//       if (includePath2.includes(pathNameTemp)) {
//         router.push(paths.marketplace.root);
//       }
//     } else {
//       if (!includePath.includes(pathNameTemp)) {
//         router.push(paths.loginCover);
//       }
//     }
//   }, [token, pathName]);
  return <>{props.children}</>;
};

const ServiceProvider = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <App>{props.children}</App>
    </Provider>
  );
};

export default ServiceProvider;
