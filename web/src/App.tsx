import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AllCurrencies from './components/AllCurrencies';
import { AddCurrencyToFavorites, Currency, CurrencyRow, RemoveCurrencyFromFavorites } from './components/CurrencyList';
import FavoriteCurrencies from './components/FavoriteCurrencies';
import { MainHeader } from './App.styles';
import useFavoriteCurrencies from './hooks/useFavoriteCurrencies';

const data = [
  {
      "shortName": "AUD",
      "name": "Dolar",
      "country": "Austrálie",
      "move": -0.3,
      "buy": 15.338,
      "sell": 16.125,
      "cnb": 15.776
  },
  {
      "shortName": "ZAR",
      "name": "Rand",
      "country": "JAR",
      "move": -0.51,
      "buy": 1.32,
      "sell": 1.388,
      "cnb": 1.36
  },
  {
      "shortName": "CAD",
      "name": "Dolar",
      "country": "Kanada",
      "move": -0.76,
      "buy": 17.129,
      "sell": 18.008,
      "cnb": 17.603
  },
  {
      "shortName": "CHF",
      "name": "Frank",
      "country": "Švýcarsko",
      "move": -0.38,
      "buy": 24.154,
      "sell": 25.392,
      "cnb": 24.846
  }
];

export default function App() {
  const {favorites, addToFavorites, removeFromFavorites } = useFavoriteCurrencies();
  const [currencies, setCurrencies] = useState(data);

  const favoriteCurrencies = useMemo(() => {
    return Array.from(favorites.values());
  }, [favorites]);

  useEffect(() => {
   const [, days = 0] = location.search.match(/days=(\d+)/) ?? [];
    if (days > 0) {
      setCurrencies((old) => {
        return old.map(({ cnb, move, ...rest}) => ({
          ...rest,
          cnb: Number((((cnb * 1000) + ((cnb * 1000) * (move * Number(days)))) / 1000).toFixed(3)),
          move,
        }));
      });
    }
  }, []);

  return (
    <section>
      <header>
        <MainHeader>Kurzovní lístek</MainHeader>
      </header>
      <FavoriteCurrencies currencies={favoriteCurrencies}>
      {favoriteCurrencies.map((currency: Currency) => (
          <CurrencyRow key={currency.shortName} {...currency}>
            <RemoveCurrencyFromFavorites action={removeFromFavorites.bind(null, currency)} />
          </CurrencyRow>
        ))}
      </FavoriteCurrencies>
      <AllCurrencies currencies={data}>
        {currencies.map((currency) => (
          <CurrencyRow key={currency.shortName} {...currency}>
            <AddCurrencyToFavorites action={favorites.get(currency.shortName) ? undefined : addToFavorites.bind(null, currency)} />
          </CurrencyRow>
        ))}
      </AllCurrencies>
    </section>
  );
}
