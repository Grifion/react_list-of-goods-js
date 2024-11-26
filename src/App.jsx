import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const SORT_ALPHABETICALLY = 'Sort alphabetically';
  const SORT_BY_LENGTH = 'Sort by length';
  const REVERSE = 'Reverse';
  const RESET = 'Reset';
  const [sortField, setSortField] = useState(null);
  const [reverse, setReverse] = useState(false);
  let visibleGoods = [...goodsFromServer];

  switch (sortField) {
    case SORT_ALPHABETICALLY:
      visibleGoods = [...goodsFromServer].sort((a, b) => (a > b ? 1 : -1));
      break;

    case SORT_BY_LENGTH:
      visibleGoods = [...goodsFromServer].sort(
        (good1, good2) => good1.length - good2.length,
      );
      break;
    default:
  }

  if (reverse) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
        >
          {SORT_ALPHABETICALLY}
        </button>
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          {SORT_BY_LENGTH}
        </button>
        <button
          type="button"
          onClick={() => {
            setReverse(!reverse);
            if (sortField === REVERSE) {
              setSortField(null);
            } else if (sortField === null) {
              setSortField(REVERSE);
            }
          }}
          className={classNames('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          {REVERSE}
        </button>
        {sortField && (
          <button
            type="button"
            className={classNames('button', 'is-danger', {
              'is-light': !sortField,
            })}
            onClick={() => {
              setSortField(null);
              setReverse(false);
            }}
          >
            {RESET}
          </button>
        )}
      </div>

      <ul className="GoodsList">
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
