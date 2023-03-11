import styled from 'styled-components';
import { currencyListBackground, currencyRowBackground, primary, rowBorder, secondary } from '../colors';

export const FavoriteCurrencySection = styled.section`
  padding: 1.2rem;
`;

export const CurrencyListSection = styled.section`
  padding: 1.2rem;
  background-color: ${currencyListBackground};
  display: flex;
  flex-flow: column;
`;

export const Grid = styled.div`
  display: flex;
  flex-flow: column;
  gap: .3rem;
  margin: 24px 0;
`;

const BaseRow = styled.div`
margin: 0 50px;
display: grid;
grid-template-columns: repeat(6, 1fr) minmax(80px, 100px);
padding: .6rem 1.2rem;
`;

export const HeaderRow = styled(BaseRow)`
  color: ${primary};
  font-weight: 600;
  font-size: .8rem
`;

export const Row = styled(BaseRow)`
  background-color: ${currencyRowBackground};
  border: solid ${rowBorder} 1px;
  color: ${secondary};
`;

export const Cell = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
`;

export const MoveCell = styled(Cell)`
  color: ${props => props.color};
`;
