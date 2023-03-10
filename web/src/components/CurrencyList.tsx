import React, { ReactNode, useMemo } from 'react';
import { Button } from '../App.styles';
import { negativeCourse, positiveCourse } from '../colors';
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

type CurrencyListProps = {
  currencies: Currency[];
  children: ReactNode;
};

type CurrencyRowProps = {
  children: ReactNode;
} & Currency;

type CurrencyAction = {
  action?: () => void;
}

export function CurrencyRow({
  shortName,
  name,
  country,
  move,
  buy,
  sell,
  cnb,
  children,
}: CurrencyRowProps) {
  return (
    <Row>
      <Cell className="name">
        {shortName} {name}
      </Cell>
      <Cell className="country">{country}</Cell>
      <Cell className="buy">{buy}</Cell>
      <Cell className="sell">{sell}</Cell>
      <Cell className="cnb">{cnb}</Cell>
      <MoveCell color={move > 0 ? positiveCourse : negativeCourse }>{move}</MoveCell>
      <Cell className="action">
        {children}
      </Cell>
    </Row>
  );
}

export function AddCurrencyToFavorites({ action }: CurrencyAction) {
  if (!action) {
    return null;
  } 

  return (
    <Button onClick={action}>Oblíbená</Button>
  );
}

export function RemoveCurrencyFromFavorites({ action }: CurrencyAction) {
  return (
    <Button onClick={action}>Zrusit</Button>
  );
}

export default function CurrencyList({ currencies, children }: CurrencyListProps) {

  return (
    <Grid>
      <HeaderRow>
        <Cell>Měna</Cell>
        <Cell>Země</Cell>
        <Cell>Nákup</Cell>
        <Cell>Prodej</Cell>
        <Cell>ČNB</Cell>
        <Cell>Změna / 1 den</Cell>
        <div></div>
      </HeaderRow>
      {children}
    </Grid>
  );
}
