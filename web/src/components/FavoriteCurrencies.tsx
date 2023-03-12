import React, { useMemo } from 'react';
import { SecondaryHeader } from '../App.styles';
import { useCurrenciesStore } from '../hooks/useCurrenciesStore';
import CurrencyList from './CurrencyList';
import { FavoriteCurrencySection } from './CurrencyList.styles';

export default function FavoriteCurrencies() {
  const getFavorites = useCurrenciesStore(({ getFavorites }) => getFavorites);
  const days = useCurrenciesStore(({ days }) => days);

  const favorites = useMemo(() => getFavorites(days), [days, getFavorites]);

  if (!favorites.length) {
    return null;
  }
  console.log(favorites);
  return (
    <FavoriteCurrencySection data-testid="favorite-currencies">
      <header>
        <SecondaryHeader>Vaše oblíbené</SecondaryHeader>
      </header>
      <CurrencyList currencies={favorites} type="FAVORITE_CURRENCIES" />
    </FavoriteCurrencySection>
  );
}
