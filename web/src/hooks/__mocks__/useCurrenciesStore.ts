import { Currency } from "../../types/Currency";
import { CurrencyStore } from "../../types/CurrencyStore";

export const mocks = {
  isLoading: jest.fn(),
  error: jest.fn(),
  currencies: jest.fn(),
  days: jest.fn(),
  favorites: jest.fn().mockReturnValue([]),
  addFavoriteCurrencies: jest.fn(),
  removeFavoriteCurrency: jest.fn(),
  fetchCurrencies: jest.fn(),
  getFavorites: jest.fn(),
  getCurrencies: jest.fn(),
  setDays: jest.fn(),
};

export const useCurrenciesStore = (selector: (s: CurrencyStore) => Partial<CurrencyStore>) => selector({
  get isLoading(): boolean {
    return mocks.isLoading() as boolean;
  },
  get error(): string {
    return mocks.error() as string;
  },
  get currencies() {
    return mocks.currencies() as Currency[];
  },
  get days() {
    return mocks.days() as number;
  },
  get favorites() {
    return mocks.favorites() as Map<string, Currency>;
  },
  addFavoriteCurrencies: (...args: string[]) => mocks.addFavoriteCurrencies(...args),
  removeFavoriteCurrency: (s: string) => mocks.removeFavoriteCurrency(s),
  fetchCurrencies: () => mocks.fetchCurrencies(),
  getFavorites: (d: number) => mocks.getFavorites(d) as Currency[],
  getCurrencies: (d: number) => mocks.getCurrencies(d) as Currency[],
  setDays: (d: number): void => {
    mocks.setDays(d);
  },
});
