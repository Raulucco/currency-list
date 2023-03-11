import React, { useEffect } from "react";
import AllCurrencies from "./components/AllCurrencies";
import FavoriteCurrencies from "./components/FavoriteCurrencies";
import { MainHeader } from "./App.styles";
import { useStore } from "./hooks/useStore";

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
    <section data-testid="app">
      <header>
        <MainHeader>Kurzovní lístek</MainHeader>
      </header>
      <FavoriteCurrencies currencies={favoriteCurrencies} />
      <AllCurrencies currencies={currencies} />
    </section>
  );
}
