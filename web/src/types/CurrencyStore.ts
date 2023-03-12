import { Currency } from "./Currency";

export type CurrencyStore = {
  readonly isLoading: boolean;
  readonly error: string;
  readonly currencies: Currency[];
  readonly days: number;
  readonly favorites: Map<string, Currency>;
  removeFavoriteCurrency: (shortName: string) => void;
  addFavoriteCurrencies: (...shortNames: string[]) => void;
  fetchCurrencies: () => void;
  getCurrencies: (d: number) => Currency[];
  getFavorites: (d: number) => Currency[];
  setDays: (d: number) => void;
};
