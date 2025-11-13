import { useRouter } from 'next/navigation';
import qs from 'qs';

const useNavigate = () => {
  const router = useRouter();
  return (
    path: string,
    {
      search,
      param = '',
      hash,
    }: {
      param?: string | number;
      search?: Record<string, string | number>;
      hash?: Record<string, string | number>;
    } = {} as {
      param?: string | number;
      search?: Record<string, string | number>;
      hash?: Record<string, string | number>;
    }
  ) => {
    const searchStr = search ? `?${qs.stringify(search)}` : '';
    const hashStr = hash ? `#${qs.stringify(hash)}` : '';
    const paramStr = param ? (path.endsWith('/') ? `${param}` : `/${param}`) : '';
    return router.push(path + paramStr + searchStr + hashStr);
  };
};

export default useNavigate;
