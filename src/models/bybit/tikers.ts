type BybitTikersCategory = "linear" | "inverse" | "option" | "spot";

export interface IBybitTikersRes {
  retCode: number;
  retMsg: string;
  result: IBybitTikersResult;
  retExtInfo: unknown;
  time: number;
}

export interface IBybitTikersResult {
  category: BybitTikersCategory;
  list: IBybitTiker[];
}

export interface IBybitTiker {
  symbol: string;
  lastPrice: string;
  indexPrice: string;
  markPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  openInterest: string;
  openInterestValue: string;
  turnover24h: string;
  volume24h: string;
  fundingRate: string;
  nextFundingTime: string;
  predictedDeliveryPrice: string;
  basisRate: string;
  deliveryFeeRate: string;
  deliveryTime: string;
  ask1Size: string;
  bid1Price: string;
  ask1Price: string;
  bid1Size: string;
  basis: string;
  preOpenPrice: string;
  preQty: string;
  curPreListingPhase: string;
}
