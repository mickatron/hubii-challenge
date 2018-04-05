import { timeParse } from 'd3-time-format';

const parseDate = timeParse('%Y-%m-%d');

export default function parseCoinAPIData(dataArray) {
  return dataArray.map(data => ({
    date: parseDate(data.time_period_start.split('T')[0]),
    open: data.price_open,
    high: data.price_high,
    low: data.price_low,
    close: data.price_close,
    volume: data.volume_traded,
  })).reverse();
}
