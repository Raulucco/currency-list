import { cleanup, render } from '@testing-library/react';
import React from 'react';
import FavoriteCurrencies from '../FavoriteCurrencies';
import { mocks } from '../../hooks/__mocks__/useCurrenciesStore';
import { flushPromises } from '../../test-utils';
jest.mock('../../hooks/useCurrenciesStore');

describe('FavoriteCurrencies', () => {
  beforeEach(() => {
    cleanup();
    mocks.getFavorites.mockReset();
  });

  it("doesn't render", async () => {
    mocks.getFavorites.mockImplementationOnce(() => []);
    const { queryByTestId } = render(<FavoriteCurrencies />);
    const favoriteCurrenciesElement = queryByTestId('favorite-currencies');
    expect(favoriteCurrenciesElement).not.toBeInTheDocument();
  });

  it('renders favorite currencies', async () => {
    mocks.getFavorites.mockImplementationOnce(() => [
      {
        shortName: 'AUD',
        name: 'Dolar',
        country: 'Austrálie',
        move: -0.3,
        buy: 15.338,
        sell: 16.125,
        cnb: 15.776,
      },
      {
        shortName: 'ZAR',
        name: 'Rand',
        country: 'JAR',
        move: -0.51,
        buy: 1.32,
        sell: 1.388,
        cnb: 1.36,
      },
    ]);

    const { queryByTestId } = render(<FavoriteCurrencies />);
    await flushPromises();
    const favoriteCurrenciesElement = queryByTestId('favorite-currencies');

    expect(mocks.getFavorites).toHaveBeenCalledTimes(1);
    expect(favoriteCurrenciesElement).toBeInTheDocument();
  });
});
