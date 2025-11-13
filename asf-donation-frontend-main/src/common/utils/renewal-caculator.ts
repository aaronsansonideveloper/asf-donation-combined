import { DealStatus } from "src/types/deal";
import myDay from "../myDay";

export const renewalCaculator = (payload: { expire_at: Date, status: DealStatus }) => {
  const { expire_at, status } = payload;

  // if the deal is expired, return 0
  if (myDay(expire_at).diff(myDay(), 'day') > 5) {
    return false;
  }
  if (status !== DealStatus.ACTIVE) {
    return false;
  }
  return true
}