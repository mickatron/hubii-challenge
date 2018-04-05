import React from 'react';
import { shallow } from 'enzyme';

import SymbolSelector from './SymbolSelector';

describe('SymbolSelector', () => {
  let component = null;
  describe('renders', () => {
    it('a snapshot', () => {
      component = shallow((
        <SymbolSelector
          activeSymbol="BTC_USD"
          symbols={[
            'BTC_USD',
            'ETH_USD',
          ]}
          onClick={() => {}}
        />
      ));
      expect(component).toMatchSnapshot();
    });
  });
});
