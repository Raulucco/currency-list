import { render } from '@testing-library/react';
import React from 'react';
import CurrencyList, { CurrencyListType } from '../CurrencyList';

describe('CurrencyList', () => {
  it.each([
    ['Měna', 'currency', 'CHF Frank'],
    ['Země', 'country', 'Švýcarsko'],
    ['Nákup', 'buy', '24.154'],
    ['Prodej', 'sell', '25.392'],
    ['ČNB', 'cnb', '24.846'],
    ['Změna / 1 den', 'move', '-0.38'],
  ])(
    'contains a header for each property',
    async (header: string, property: string, value: string) => {
      const { findByText, findByTestId } = render(
        <CurrencyList
          currencies={[
            {
              shortName: 'CHF',
              name: 'Frank',
              country: 'Švýcarsko',
              move: -0.38,
              buy: 24.154,
              sell: 25.392,
              cnb: 24.846,
            },
          ]}
          type="STANDARD_CURRENCIES"
        />
      );

      const element = await findByText(header);
      expect(element).toBeInTheDocument();
      const cell = await findByTestId(property);
      expect(cell.textContent).toMatch(value);
    }
  );

  it.each([
    ['STANDARD_CURRENCIES', 'Oblíbená'],
    ['FAVORITE_CURRENCIES', 'Zrusit'],
  ])('support two types of actions', async (type: string, text: string) => {
    const { findByText } = render(
      <CurrencyList
        currencies={[
          {
            shortName: 'CHF',
            name: 'Frank',
            country: 'Švýcarsko',
            move: -0.38,
            buy: 24.154,
            sell: 25.392,
            cnb: 24.846,
          },
        ]}
        type={type as CurrencyListType}
      />
    );
    const btn = await findByText(text);
    expect(btn).toBeEnabled();
    expect(btn).toBeInTheDocument();
  });
});
