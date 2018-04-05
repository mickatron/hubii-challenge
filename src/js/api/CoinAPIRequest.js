import axios from 'axios';
import localforage from 'localforage';


function buildRequest() {
  const xhrOptions = {
    baseURL: 'https://rest.coinapi.io/',
    timeout: 30000,
    headers: {
      'X-CoinAPI-Key': 'D13A2C82-CC2F-4E12-8506-98966EB995FC',
    },
  };

  const req = axios.create(xhrOptions);

  req.interceptors.response.use(
    res => res.data,
    res => Promise.reject(res.data.error || { error: { message: 'CoinAPI: Something has gone wrong.' } }),
  );
  return req;
}

export const request = buildRequest();

/**
 * Request symbol data from the CoinAPI service.
 * @param {String} symbolId
 * @param {String} queryString The requests query string parameters.
 */
export function getSymbolData(symbolId, queryString = 'latest?period_id=1DAY') {
  // check local storage so we dont hit the CoinAPI service too much.
  return localforage.getItem('hubii-challenge')
    .then((storedState) => {
      if (storedState && storedState.symbol === symbolId && storedState.data) {
        return { response: storedState.data, symbolId };
      }
      return request.get(`v1/ohlcv/${symbolId}/${queryString}`)
        .then(
          (response) => {
            localforage.setItem('hubii-challenge', { ...storedState, [symbolId]: response });
            return { response, symbolId };
          },
          () => ({ error: 'Something has gone wrong when fetching data from the CoinAPI service.', symbolId }),
        )
        .catch(console.log);
    });
}
