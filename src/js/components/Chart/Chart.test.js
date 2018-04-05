import React from 'react';
import { shallow } from 'enzyme';
import Chart from './Chart';

const date = new Date('2018-04-05T00:00:00');
function createChartData(length = 9, data = []) {
  if (length === -1) {
    return data;
  }
  date.setDate(date.getDate() - 1);
  data.push({
    close: 25.710416,
    date,
    high: 25.835021381744056,
    low: 25.411360259406774,
    open: 25.436282332605284,
    volume: 38409100,
  });
  return createChartData(length - 1, data);
}

describe('Chart', () => {
  let component = null;
  describe('renders', () => {
    it('a snapshot', () => {
      component = shallow((
        <Chart
          data={createChartData()}
        />
      ));
      expect(component).toMatchSnapshot();
    });
  });
});
