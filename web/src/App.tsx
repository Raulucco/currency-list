import React, { useEffect } from 'react';
import AllCurrencies from './components/AllCurrencies';
import FavoriteCurrencies from './components/FavoriteCurrencies';
import { MainHeader } from './App.styles';
import { useStore } from './hooks/useStore';

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
  const currencies = useStore(({ getCurrencies }) => getCurrencies());
  const fetchCurrencies = useStore(({ fetchCurrencies }) => fetchCurrencies);

  const favoriteCurrencies = useStore(({ getFavorites }) => getFavorites());

  useEffect(() => {
    if (!currencies.length) {
      fetchCurrencies();
    }
  }, []);

  return (
    <section>
      <header>
        <MainHeader>Kurzovní lístek</MainHeader>
      </header>
      <FavoriteCurrencies currencies={favoriteCurrencies} />
      <AllCurrencies currencies={currencies} />
    </section>
  );
}
