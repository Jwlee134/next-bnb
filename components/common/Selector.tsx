import React from "react";
import styled from "styled-components";
import palette from "~/styles/palette";

const Container = styled.div`
  width: 100%;
  height: 46px;
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
}

const Selector = ({ options = [], ...props }: Props) => {
  const { defaultValue } = props;
  return (
    <Container>
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
