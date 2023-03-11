import React from "react";
import { SecondaryHeader } from "../App.styles";
import CourseMenu from "./CourseMenu";
import CurrencyList, { Currency } from "./CurrencyList";
import { CurrencyListSection } from "./CurrencyList.styles";

type AllCurrenciesProps = {
  currencies: Currency[];
};

export default function AllCurrencies({ currencies }: AllCurrenciesProps) {
  return (
    <CurrencyListSection data-testid="all-currencies">
      <header>
        <SecondaryHeader>Seznam všech kurzů</SecondaryHeader>
      </header>

      <CourseMenu />
      <CurrencyList currencies={currencies} type="STANDARD_CURRENCIES" />
    </CurrencyListSection>
  );
}
