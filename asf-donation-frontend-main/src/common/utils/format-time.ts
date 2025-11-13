import { format, getTime, formatDistanceToNow } from 'date-fns';
import myDay from 'src/common/myDay';
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

// 输入你的日期，这里假设日期为 "2023-10-12"。
// 自定义格式化函数，添加 "th" 后缀。
export function customFormat(date: myDay.Dayjs) {
  const day = date.date();
  const month = date.format('MMM');
  const year = date.year();

  // 根据日期的最后一位数字来决定 "th" 后缀。
  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }

  return `${day}${daySuffix} ${month}, ${year}`;
}
