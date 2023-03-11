import React from "react";
import { Button } from "../App.styles";
import { negativeCourse, positiveCourse } from "../colors";
import { useStore } from "../hooks/useStore";
import { Cell, Grid, HeaderRow, MoveCell, Row } from "./CurrencyList.styles";

export type Currency = {
  shortName: string;
  name: string;
  country: string;
  move: number;
  buy: number;
  sell: number;
  cnb: number;
};

type CurrencyListType = "STANDARD_CURRENCIES" | "FAVORITE_CURRENCIES";

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
  const addFavoriteCurrency = useStore(
    ({ addFavoriteCurrency }) => addFavoriteCurrency
  );
  const favorites = useStore(({ favorites }) => favorites);

  if (favorites.get(shortName)) {
    return null;
  }

  return (
    <Button onClick={() => addFavoriteCurrency(shortName)}>Oblíbená</Button>
  );
}

export function RemoveCurrencyFromFavorites({ shortName }: CurrencyAction) {
  const removeFavoriteCurrency = useStore(
    ({ removeFavoriteCurrency }) => removeFavoriteCurrency
  );

  return (
    <Button onClick={() => removeFavoriteCurrency(shortName)}>Zrusit</Button>
  );
}

export function CurrencyRow({
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
      <Cell data-testid="name">
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
        {type === "FAVORITE_CURRENCIES" && (
          <RemoveCurrencyFromFavorites shortName={shortName} />
        )}
        {type === "STANDARD_CURRENCIES" && (
          <AddCurrencyToFavorites shortName={shortName} />
        )}
      </Cell>
    </Row>
  );
}

export default function CurrencyList({ currencies, type }: CurrencyListProps) {
  return (
    <Grid data-testid="currency-list">
      <HeaderRow>
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
