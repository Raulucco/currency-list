import React from 'react';
import App from '../App';
import { flushPromises } from '../test-utils';
import {
  cleanup,
  render,
  act,
  fireEvent,
  prettyDOM,
  waitFor,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { FavoritesStorageKey } from '../hooks/useCurrenciesStore';

const currencies = [
  {
    shortName: 'CHF',
    name: 'Frank',
    country: 'Švýcarsko',
    move: -0.38,
    buy: 24.154,
    sell: 25.392,
    cnb: 24.846,
  },
  {
    shortName: 'DKK',
    name: 'Koruna',
    country: 'Dánsko',
    move: 0.15,
    buy: 3.188,
    sell: 3.351,
    cnb: 3.269,
  },
];

describe('App', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    fetchMock.mockResponse(() => Promise.resolve(JSON.stringify(currencies)));
    cleanup();
    global.localStorage.clear();
  });

  it('fetchs currencies', async () => {
    const { queryAllByTestId } = render(<App />);
    let currencyRows = queryAllByTestId('currency-row');
    expect(currencyRows).toHaveLength(0);

    await act(async () => {
      await flushPromises();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/data.json'
    );
    currencyRows = queryAllByTestId('currency-row');
    expect(currencyRows).toHaveLength(currencies.length);
  });

  it('loads favorite currency list from localStorage', async () => {
    global.localStorage.setItem(FavoritesStorageKey, JSON.stringify(currencies));
    // fetchMock.mockRejectOnce();

    const { queryByTestId } = render(<App />);
    const element = queryByTestId('favorite-currencies');
    expect(element).toBeInTheDocument();
    const rows = element?.querySelectorAll('[data-testid="currency-row"]') ?? [];
    expect(rows).toHaveLength(currencies.length);
  });

  it('removes favorite currencies', async () => {
    global.localStorage.setItem(FavoritesStorageKey, JSON.stringify(currencies));

    const { queryByTestId, findByTestId } = render(<App />);
    await act(async () => {
      await flushPromises();
    });
    let element = queryByTestId('favorite-currencies');
    expect(element).toBeInTheDocument();
    // console.log(prettyDOM(element!));
    const rows =
      element?.querySelectorAll('[data-testid="currency-row"]') ?? [];
    expect(rows).toHaveLength(currencies.length);

    // Currencies added to favorites doesn't have a favorite button
    await waitFor(async () => {
      const el = await findByTestId('all-currencies');
      expect(el).toBeInTheDocument();
      const currencyRows = el.querySelectorAll('[data-testid="currency-row"]');
      expect(currencyRows).toHaveLength(currencies.length);

      const promises = Array.from(currencyRows).map(async (row) => {
        const button = row.querySelector('button');
        expect(button).not.toBeInTheDocument();
        await Promise.resolve();
      });

      await Promise.all(promises);
    });

    // Click on cancel buttons
    await act(async () => {
      const promises = Array.from(rows).map(async (row) => {
        const button = row.querySelector('button');
        if (!button) {
          throw new Error(`Button missing for row\n${prettyDOM(row)}`);
        }

        expect(button).toBeInTheDocument();
        expect(button.textContent).toMatch('Zrusit');
        fireEvent.click(button as HTMLButtonElement);
        fireEvent.click(button);
      });

      await Promise.all(promises);
    });

    element = queryByTestId('favorite-currencies');
    expect(element).not.toBeInTheDocument();

    // Currencies not in favorites have a favorite button
    await waitFor(async () => {
      const el = await findByTestId('all-currencies');
      expect(el).toBeInTheDocument();
      const currencyRows = el.querySelectorAll('[data-testid="currency-row"]');
      expect(currencyRows).toHaveLength(currencies.length);

      const promises = Array.from(currencyRows).map(async (row) => {
        const button = row.querySelector('button');
        expect(button).toBeInTheDocument();
        expect(button?.textContent).toMatch('Oblíbená');
        await Promise.resolve();
      });

      await Promise.all(promises);
    });
  });

  it('adds clicked currency to favorite currencies', async () => {
    global.localStorage.setItem(FavoritesStorageKey, JSON.stringify([]));

    const { findByTestId, queryByTestId } = render(<App />);
    await waitFor(async () => {
      await flushPromises();
    });
    let favoriteCurrenciesEl = queryByTestId('favorite-currencies');
    expect(favoriteCurrenciesEl).not.toBeInTheDocument();
    let rows =
      favoriteCurrenciesEl?.querySelectorAll('[data-testid="currency-row"]') ??
      [];
    expect(rows).toHaveLength(0);

    const allCurrenciesEl = await findByTestId('all-currencies');
    expect(allCurrenciesEl).toBeInTheDocument();
    const standardCurrencyRows =
      allCurrenciesEl?.querySelectorAll('[data-testid="currency-row"]') ?? [];
    expect(standardCurrencyRows).toHaveLength(currencies.length);

    await act(async () => {
      const promises = Array.from(standardCurrencyRows).map(async (row) => {
        const button = row.querySelector('button');

        if (!button) {
          throw new Error(`Button missing for row\n${prettyDOM(row)}`);
        }

        expect(button).toBeInTheDocument();
        expect(button.textContent).toMatch('Oblíbená');
        fireEvent.click(button as HTMLButtonElement);

        await flushPromises();
      });
      await Promise.all(promises);
    });

    favoriteCurrenciesEl = await findByTestId('favorite-currencies');
    expect(favoriteCurrenciesEl).toBeInTheDocument();
    rows =
      favoriteCurrenciesEl?.querySelectorAll('[data-testid="currency-row"]') ??
      [];
    expect(rows).toHaveLength(currencies.length);
  });

});
