import React, { Component } from 'react';
import CandlestickChart from 'js/components/Chart/Chart';
import { fitWidth } from 'react-stockcharts/lib/helper';
import parseCoinAPIData from 'js/components/Chart/parseCoinAPIData';
import SymbolSelector from 'js/components/SymbolSelector/SymbolSelector';
import { getSymbolData } from 'js/api/CoinAPIRequest';
import './App.css';

const FitWidthChart = fitWidth(CandlestickChart);

export default class App extends Component {
  state = {
    data: undefined,
    error: undefined,
    loading: true,
    symbol: 'BTC_USD',
  };

  componentDidMount() {
    this.getData(this.state.symbol);
  }

  onClickHandler = (event) => {
    this.setState(
      { error: undefined, loading: true },
      this.getData(event.target.value),
    );
  }

  getData(symbol) {
    getSymbolData(`BITSTAMP_SPOT_${symbol}`)
      .then((data) => {
        if (data.response) {
          const parsedData = parseCoinAPIData(data.response);
          this.setState({
            data: parsedData,
            error: undefined,
            loading: false,
            symbol,
          });
        } else if (data.error) {
          this.setState({ error: data.error });
        }
      });
  }

  render() {
    const {
      data,
      error,
      loading,
      symbol,
    } = this.state;

    return (
      <div className="App">
        <SymbolSelector
          activeSymbol={symbol}
          symbols={[
            'BTC_USD',
            'ETH_USD',
          ]}
          onClick={this.onClickHandler}
        />
        <div className="App__Chart">
          {error && <div className="App__error"><p>{error}</p></div>}
          {!error && loading &&
            <div className="App__loading"><p>Loading Chart Data...</p></div>}
          {data && !loading &&
            <FitWidthChart data={data} />
          }
        </div>
      </div>
    );
  }
}
