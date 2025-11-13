// 设置 cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = ``;
}

// 获取 cookie
function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// 删除 cookie
function deleteCookie(name: string) {
  setCookie(name, '', -1);
}
export { deleteCookie, getCookie, setCookie };

