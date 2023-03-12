import React from 'react';
import AllCurrencies from './components/AllCurrencies';
import FavoriteCurrencies from './components/FavoriteCurrencies';
import { MainHeader } from './App.styles';
import { useCurrenciesStore } from './hooks/useCurrenciesStore';

export default function App() {
  const error = useCurrenciesStore(({ error }) => error);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section data-testid="app">
      <header>
        <MainHeader>Kurzovní lístek</MainHeader>
      </header>
      <FavoriteCurrencies />
      <AllCurrencies />
    </section>
  );
}
