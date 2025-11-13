import { DealStatistics } from "src/service/stores/dealStore/model";
import { DealStatus, DealType } from "src/types/deal";

export const statisticsReducer = (payload: { id: number, data: DealStatistics[] }) => {
  // use reduct function to sumup the statistics
  let initValue = {
    deal_id: payload.id,
    views: 0,
    clicks: 0,
    likes: 0,
  }

  const statistics = payload.data.reduce((acc, cur) => {
    acc.views += cur.views;
    acc.clicks += cur.clicks;
    acc.likes += cur.likes;
    return acc;
  }
    , initValue);

  return statistics;
}

export const statisticsSeparator = (payload: { ids: number[], data: DealStatistics[] }) => {
  // create initial empty array for each deal
  let statistics = payload.ids.map(id => {
    return {
      deal_id: id,
      views: 0,
      clicks: 0,
      likes: 0,
    }
  });

  // use reduct function to sumup the statistics
  for (let item of statistics) {
    for (let sourceItem of payload?.data) {
      if (item.deal_id === sourceItem.deal_id) {
        item.views += sourceItem.views;
        item.clicks += sourceItem.clicks;
        item.likes += sourceItem.likes;
      }
    }
  }

  return statistics;
}