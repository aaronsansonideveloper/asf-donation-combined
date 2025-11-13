const useHashParams = <
  T extends {
    [key: PropertyKey]: any;
  },
>() => {
  return () => {
    let hashData: { [key in keyof T]: T[key] } = {} as { [key in keyof T]: T[key] };

    window.location.hash
      .replace('#', '')
      .split('&')
      .forEach((item) => {
        let key = item.split('=')[0] as keyof T;
        hashData[key] = item.split('=')[1] as T[typeof key];
      });
    return hashData;
  };
};

export default useHashParams;
