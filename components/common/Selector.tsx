import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "~/store";
import palette from "~/styles/palette";

const Container = styled.div`
  width: 100%;
  height: 46px;
`;

const Select = styled.select<{ isValid: boolean; validateMode: boolean }>`
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
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      border-color: ${isValid ? palette.dark_cyan : palette.tawny};
      background-color: ${isValid ? "white" : palette.snow};
    `}
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  isValid?: boolean;
  style?: Object;
}

const Selector = ({
  options = [],
  isValid = false,
  style,
  ...props
}: Props) => {
  const { defaultValue } = props;
  const { validateMode } = useSelector((state) => state.common);
  return (
    <Container style={style}>
      <Select {...props} isValid={isValid} validateMode={validateMode}>
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

export default React.memo(Selector);
