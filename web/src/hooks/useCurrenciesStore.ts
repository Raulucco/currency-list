import { create } from 'zustand';
import { Currency } from '../types/Currency';
import { CurrencyStore } from '../types/CurrencyStore';

export function calculateAccumulativeCNB(currency: Currency, days: number) {
  const { cnb, move } = currency;
  return {
    ...currency,
    cnb: Number(
      (
        Array(days)
          .fill(move)
          .reduce((acc, percentage) => acc + acc * percentage, cnb * 1000) /
        1000
      ).toFixed(3)
    ),
  };
}

function initFavoriteCurrencies(favorites: Map<string, Currency>) {
  const cache = JSON.parse(
    global.localStorage.getItem(FavoritesStorageKey) ?? JSON.stringify([])
  ) as Currency[];
  cache.forEach((currency) => {
    favorites.set(currency.shortName, currency);
  });
  return favorites;
}

export const FavoritesStorageKey = '@currency-list-app/favorites';
const MIN_DAYS = 0;
const MAX_DAYS = 3;

export const useCurrenciesStore = create<CurrencyStore>((set, get) => {
  const getFavoritesFactory = () => (days: number): Currency[] => {
    const { favorites: originalFavorites } = get();
    const favorites = Array.from(originalFavorites.values());

    if (!favorites.length) {
      const cacheFavorites = initFavoriteCurrencies(new Map());
      if (cacheFavorites.size > 0) {
        favorites.push(...cacheFavorites.values());
        set({
          favorites: cacheFavorites,
        });
      }
    }

    if (days === MIN_DAYS) {
      return favorites;
    }

    return favorites.map((currency) =>
      calculateAccumulativeCNB(currency, days)
    );
  };
  
  const getCurrenciesFactory = () => (days: number): Currency[] => {
    const { currencies, fetchCurrencies } = get();

    if (!currencies.length) {
      fetchCurrencies();
    }

    if (days === MIN_DAYS) {
      return currencies;
    }

    return currencies.map((currency) =>
      calculateAccumulativeCNB(currency, days)
    );
  }

  return {
    isLoading: false,
    error: '',
    currencies: [] as Currency[],
    days: Number(new URLSearchParams(global.location.search).get('days')) || MIN_DAYS,
    favorites: initFavoriteCurrencies(new Map<string, Currency>()),
    addFavoriteCurrencies: (...shortNames: string[]) => {
      const { currencies, favorites } = get();
      shortNames.forEach((shortName) => {
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
      });

      localStorage.setItem(
        FavoritesStorageKey,
        JSON.stringify(Array.from(favorites.values()))
      );

      set({
        getFavorites: getFavoritesFactory(),
        favorites: new Map(favorites.entries()),
        error: '',
      });
    },
    removeFavoriteCurrency: (shortName: string) => {
      const { favorites } = get();
      favorites.delete(shortName);
      const newCurrencies = Array.from(favorites.values());
      localStorage.setItem(FavoritesStorageKey, JSON.stringify(newCurrencies));

      set({
        favorites: new Map<string, Currency>(favorites.entries()),
        getFavorites: getFavoritesFactory(),
        error: ''
      });
    },
    fetchCurrencies: async () => {
      set({
        isLoading: true,
      });
      try {
        const response = await fetch('http://localhost:3000/api/data.json');
        const currencies = await response.json();
        set({
          isLoading: false,
          currencies,
          getCurrencies: getCurrenciesFactory(),
          error: '',
        });
      } catch (e: unknown) {
        // eslint-disable-next-line no-console
        console.error(e);
        set({
          isLoading: false,
          error:
            'There was an error while fetching the currencies. Please try again later.',
        });
      }
    },
    getFavorites: getFavoritesFactory(),
    getCurrencies: getCurrenciesFactory(),
    setDays: (days: number) => {
      if (days < MIN_DAYS || days > MAX_DAYS || !Number.isInteger(days)) {
        set({
          error: `Number of days must be an integer between ${MIN_DAYS} and ${MAX_DAYS} inclusive.\nGot ${days} instead.`,
        });
        return;
      }

      global.history.pushState({ days }, '', `?days=${days}`);
      set({
        days,
        error: '',
      });
    },
  };
});
