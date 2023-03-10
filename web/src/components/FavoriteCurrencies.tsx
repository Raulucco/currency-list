import React, { ReactNode } from 'react';
import { SecondaryHeader } from '../App.styles';
import CurrencyList, { Currency } from './CurrencyList';
import { FavoriteCurrencySection } from './CurrencyList.styles';

type FavoriteCurrenciesProps = {
  currencies: Currency[];
  children: ReactNode;
};

export default function FavoriteCurrencies({ currencies, children }: FavoriteCurrenciesProps) {
  if (!currencies.length) {
    return null;
  }
  return (
    <FavoriteCurrencySection>
      <header>
        <SecondaryHeader>Vaše oblíbené</SecondaryHeader>
      </header>
      <CurrencyList currencies={currencies}>
        {children}
      </CurrencyList>
    </FavoriteCurrencySection>
  );
}
