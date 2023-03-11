import React from "react";
import { SecondaryHeader } from "../App.styles";
import CurrencyList, { Currency } from "./CurrencyList";
import { FavoriteCurrencySection } from "./CurrencyList.styles";

type FavoriteCurrenciesProps = {
  currencies: Currency[];
};

export default function FavoriteCurrencies({
  currencies,
}: FavoriteCurrenciesProps) {
  if (!currencies.length) {
    return null;
  }

  return (
    <FavoriteCurrencySection data-testid="favorite-currencies">
      <header>
        <SecondaryHeader>Vaše oblíbené</SecondaryHeader>
      </header>
      <CurrencyList currencies={currencies} type="FAVORITE_CURRENCIES" />
    </FavoriteCurrencySection>
  );
}
