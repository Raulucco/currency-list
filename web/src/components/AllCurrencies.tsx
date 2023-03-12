import React, { useEffect, useMemo } from 'react';
import { SecondaryHeader } from '../App.styles';
import { useCurrenciesStore } from '../hooks/useCurrenciesStore';
import CourseMenu from './CourseMenu';
import CurrencyList from './CurrencyList';
import { CurrencyListSection } from './CurrencyList.styles';

export default function AllCurrencies() {
  const days = useCurrenciesStore(({ days }) => days);
  const getCurrencies = useCurrenciesStore(({ getCurrencies }) => getCurrencies);
  const currencies = useMemo(() => getCurrencies(days), [days, getCurrencies]);

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
