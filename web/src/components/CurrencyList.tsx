import React from 'react';
import { Button } from '../App.styles';
import { negativeCourse, positiveCourse } from '../colors';
import { useCurrenciesStore } from '../hooks/useCurrenciesStore';
import { Currency } from '../types/Currency';
import { Cell, Grid, HeaderRow, MoveCell, Row } from './CurrencyList.styles';

export type CurrencyListType = 'STANDARD_CURRENCIES' | 'FAVORITE_CURRENCIES';

type CurrencyListProps = {
  currencies: Currency[];
  type: CurrencyListType;
};

type CurrencyRowProps = {
  type: CurrencyListType;
} & Currency;

type CurrencyAction = {
  shortName: string;
};

export function AddCurrencyToFavorites({ shortName }: CurrencyAction) {
  const addFavoriteCurrency = useCurrenciesStore(
    ({ addFavoriteCurrencies }) => addFavoriteCurrencies
  );
  const favorites = useCurrenciesStore(({ favorites }) => favorites);
  if (favorites.get(shortName)) {
    return null;
  }

  return (
    <Button onClick={() => addFavoriteCurrency(shortName)}>Oblíbená</Button>
  );
}

export function RemoveCurrencyFromFavorites({ shortName }: CurrencyAction) {
  const removeFavoriteCurrency = useCurrenciesStore(
    ({ removeFavoriteCurrency }) => removeFavoriteCurrency
  );

  return (
    <Button onClick={() => removeFavoriteCurrency(shortName)}>Zrusit</Button>
  );
}

function CurrencyRow({
  shortName,
  name,
  country,
  move,
  buy,
  sell,
  cnb,
  type,
}: CurrencyRowProps) {
  return (
    <Row data-testid="currency-row">
      <Cell data-testid="currency">
        {shortName} {name}
      </Cell>
      <Cell data-testid="country">{country}</Cell>
      <Cell data-testid="buy">{buy}</Cell>
      <Cell data-testid="sell">{sell}</Cell>
      <Cell data-testid="cnb">{cnb}</Cell>
      <MoveCell
        color={move > 0 ? positiveCourse : negativeCourse}
        data-testid="move"
      >
        {move}
      </MoveCell>
      <Cell data-testid="action">
        {type === 'FAVORITE_CURRENCIES' && (
          <RemoveCurrencyFromFavorites shortName={shortName} />
        )}
        {type === 'STANDARD_CURRENCIES' && (
          <AddCurrencyToFavorites shortName={shortName} />
        )}
      </Cell>
    </Row>
  );
}

export default function CurrencyList({ currencies, type }: CurrencyListProps) {
  return (
    <Grid data-testid="currency-list">
      <HeaderRow data-testid="currency-list-header">
        <Cell>Měna</Cell>
        <Cell>Země</Cell>
        <Cell>Nákup</Cell>
        <Cell>Prodej</Cell>
        <Cell>ČNB</Cell>
        <Cell>Změna / 1 den</Cell>
        <div></div>
      </HeaderRow>
      {currencies.map((currency) => (
        <CurrencyRow key={currency.shortName} {...currency} type={type} />
      ))}
    </Grid>
  );
}
