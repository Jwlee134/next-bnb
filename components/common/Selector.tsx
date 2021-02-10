import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "~/store";
import palette from "~/styles/palette";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny};
        background-color: ${isValid ? "white" : palette.snow};
      }
    `}
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid ${palette.gray_eb};
  padding: 0px 11px;
  outline: none;
  border-radius: 4px;
  -webkit-appearance: none;
  &:focus {
    border-color: ${palette.dark_cyan};
  }
  background-image: url("/static/svg/common/selector/down_arrow.svg");
  background-repeat: no-repeat;
  background-position: right 11px center;
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  isValid?: boolean;
}

const Selector = ({ options = [], isValid = false, ...props }: Props) => {
  const { defaultValue } = props;
  const { validateMode } = useSelector((state) => state.common);
  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <Select {...props}>
        <option disabled>{defaultValue}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default Selector;
