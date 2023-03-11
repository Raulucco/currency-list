import { create } from "zustand";
import { Currency } from "../components/CurrencyList";

type Store = {
  error: string;
  currencies: Currency[];
  days: number;
  favorites: Map<string, Currency>;
  removeFavoriteCurrency: (shortName: string) => void;
  addFavoriteCurrency: (shortName: string) => void;
  fetchCurrencies: () => void;
  getCurrencies: () => Currency[];
  getFavorites: () => Currency[];
  setDays: (d: number) => void;
};

function calculateCNB(currency: Currency, days: number) {
  const { cnb, move } = currency;
  return {
    ...currency,
    cnb: Number(
      ((cnb * 1000 + cnb * 1000 * (move * Number(days))) / 1000).toFixed(3)
    ),
  };
}

const FavoritesStorageKey = "@currency-list-app/favorites";
const MIN_DAYS = 0;
const MAX_DAYS = 3;

export const useStore = create<Store>((set, get) => ({
  error: "",
  currencies: [] as Currency[],
  days: Number(new URLSearchParams(window.location.search).get("days")) || 0,
  favorites: new Map<string, Currency>(),
  addFavoriteCurrency: (shortName: string) => {
    const { currencies, favorites } = get();
    const currency = currencies.find(
      (currency) => currency.shortName === shortName
    );

    if (!currency) {
      set({
        error: `Currency ${shortName} cannot be added to favorites because it doesn't exits in currency list!`,
      });
      return;
    }

    favorites.set(shortName, currency);
    localStorage.setItem(
      FavoritesStorageKey,
      JSON.stringify(Array.from(favorites.values()))
    );

    set({
      favorites: new Map(favorites.entries()),
      error: "",
    });
  },
  removeFavoriteCurrency: (shortName: string) => {
    const { favorites } = get();
    favorites.delete(shortName);
    const newCurrencies = Array.from(favorites.values());
    localStorage.setItem(FavoritesStorageKey, JSON.stringify(newCurrencies));

    set({
      favorites: new Map<string, Currency>(favorites.entries()),
    });
  },
  fetchCurrencies: async () => {
    try {
      const response = await fetch(
        new URL("http://localhost:3000/api/data.json")
      );
      const currencies = await response.json();
      set({
        currencies,
        error: "",
      });
    } catch (e: unknown) {
      set({
        error: String(e),
      });
    }
  },
  getFavorites: () => {
    const days = get().days;
    const favorites = Array.from(get().favorites.values());

    if (!favorites.length) {
      favorites.push(
        ...JSON.parse(
          localStorage.getItem(FavoritesStorageKey) ?? JSON.stringify([])
        )
      );
    }

    if (days === 0) {
      return favorites;
    }

    return favorites.map((currency) => calculateCNB(currency, days));
  },
  getCurrencies: () => {
    const days = get().days;

    if (days === 0) {
      return get().currencies;
    }

    return get().currencies.map((currency) => calculateCNB(currency, days));
  },
  setDays: (days: number) => {
    if (days < MIN_DAYS || days > MAX_DAYS || !Number.isInteger(days)) {
      set({
        error: `Number of days must be an integer between ${MIN_DAYS} and ${MAX_DAYS} inclusive.\nGot ${days} instead.`,
      });
      return;
    }

    window.history.pushState({ days }, "", `?days=${days}`);
    set({
      days,
      error: "",
    });
  },
}));
