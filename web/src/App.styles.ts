import styled from "styled-components";
import { primary, secondary } from "./colors";

export const MainHeader = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${primary};
  text-align: center;
`; 

export const SecondaryHeader = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${secondary};
  text-align: center;
`; 

export const Button = styled.button`
  text-decoration: underline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${secondary};
`;
