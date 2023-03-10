import { useCallback, useEffect, useState } from "react";
import { Currency } from "../components/CurrencyList";

const FavoritesStorageKey = '@currency-list-app/favorites';

type UseFavoriteCurrenciesObj = {
  favorites: Map<string, Currency>;
  addToFavorites: (c: Currency) => void;
  removeFromFavorites: (c: Currency) => void;
};

export default function useFavoriteCurrencies(): UseFavoriteCurrenciesObj {
  const [favorites, setFavorites] = useState<Map<string, Currency>>(new Map());
  useEffect(() => {
    const stored = localStorage.getItem(FavoritesStorageKey);
    if (stored) {
      setFavorites(new Map(JSON.parse(stored).map((currency: Currency) => {
        return [currency.shortName, currency];
      })));
    }
  }, []);

  const addToFavorites = useCallback((currency: Currency) => {
    setFavorites((old) => {
      old.set(currency.shortName, currency);
      const currencies = Array.from(old.values());
      localStorage.setItem(FavoritesStorageKey, JSON.stringify(currencies));
      return new Map(currencies.map((curr) => {
        return [curr.shortName, curr];
      }));
    });
  }, []);

  const removeFromFavorites = useCallback((currency: Currency) => {
    setFavorites((currencies) => {
      currencies.delete(currency.shortName);
      const newCurrencies = Array.from(currencies.values());

      localStorage.setItem(FavoritesStorageKey, JSON.stringify(newCurrencies));

      return new Map(currencies.entries());
    });
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
}
