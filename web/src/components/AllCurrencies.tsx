import React, { ReactNode } from "react";
import { SecondaryHeader } from "../App.styles";
import CourseMenu from "./CouseMenu";
import CurrencyList, { Currency } from "./CurrencyList";
import { CurrencyListSection } from "./CurrencyList.styles";

type AllCurrenciesProps = {
  currencies: Currency[];
  children: ReactNode;
};

export default function AllCurrencies({ currencies, children }: AllCurrenciesProps) {
  return (
    <CurrencyListSection>
      <header>
        <SecondaryHeader>Seznam všech kurzů</SecondaryHeader>
        </header>

        <CourseMenu />
        <CurrencyList currencies={currencies} >
          {children}
        </CurrencyList>
    </CurrencyListSection>
  );
}
