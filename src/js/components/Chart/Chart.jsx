import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { scaleTime } from 'd3-scale';
import { utcDay } from 'd3-time';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { last, timeIntervalBarWidth } from 'react-stockcharts/lib/utils';

import classNameType from 'js/propTypes/className';

export default class CandleStickChart extends React.Component {
  static propTypes = {
    className: classNameType,
    data: PropTypes.arrayOf(PropTypes.shape({
      close: PropTypes.number.isRequired, // 25.710416
      date: PropTypes.string.isRequired, // "Mon Jan 04 2010 00:00:00 GMT+1100...."
      high: PropTypes.number.isRequired, // 25.835021381744056
      low: PropTypes.number.isRequired, // 25.411360259406774
      open: PropTypes.number.isRequired, // 25.436282332605284
      volume: PropTypes.number.isRequired, // 38409100
    })).isRequired,
    ratio: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    className: undefined,
    ratio: undefined,
    width: undefined,
  };

  render() {
    const {
      className,
      data,
      ratio,
      width,
    } = this.props;
    const xAccessor = d => d.date;
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(-data[data.length]),
    ];

    return (
      <ChartCanvas
        className={classnames(className, 'Chart')}
        height={400}
        ratio={ratio}
        width={width}
        margin={{
          left: 50, right: 50, top: 10, bottom: 30,
        }}
        type="svg"
        seriesName="HubiiChallenge"
        data={data}
        displayXAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    );
  }
}

