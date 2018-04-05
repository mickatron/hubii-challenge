import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import classNameType from 'js/propTypes/className';

import './SymbolSelector.css';

export default class SymbolSelector extends React.PureComponent {
  static propTypes = {
    activeSymbol: PropTypes.string,
    className: classNameType,
    symbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeSymbol: undefined,
    className: undefined,
  }

  render() {
    const {
      activeSymbol,
      className,
      onClick,
      symbols,
    } = this.props;
    return (
      <ul className={classnames(className, 'SymbolSelector')}>
        {symbols.map(symbol => (
          <li key={symbol}>
            <button
              className={classnames(
                'SymbolSelector__button',
                { 'SymbolSelector__button--active': symbol === activeSymbol },
              )}
              onClick={onClick}
              value={symbol}
            >
              {symbol.replace('_', '/')}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
