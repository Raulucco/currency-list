import styled from "styled-components";
import { primary } from "../colors";

export const CourseButtonsRow = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 2px;
  background-color: ${primary};
  margin: 0 auto;
`;

export const CourseButton = styled.button<{backgroundColor: string}>`
  padding: .8em;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border: none;
`;
