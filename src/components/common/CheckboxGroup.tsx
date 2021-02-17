import React from "react";
import palette from "src/styles/palette";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${palette.gray_48};
  cursor: pointer;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  width: fit-content;
`;

const Input = styled.input`
  position: relative;
  width: 18px;
  height: 18px;
  margin: 0;
  border: 1px solid ${palette.gray_b0};
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  &:checked {
    -webkit-appearance: none;
    outline: none;
    border: 0;
  }
  &:checked:after {
    position: absolute;
    border-radius: 2px;
    content: "";
    width: 18px;
    height: 18px;
    background-color: ${palette.dark_cyan};
    background-image: url("/static/svg/common/checkbox/checkbox_mark.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Option = styled.span`
  margin-left: 8px;
`;

interface Props {
  items: string[];
  options: string[];
  handleChange: (selected: string[]) => void;
}

const CheckboxGroup = ({ items, options, handleChange }: Props) => {
  return (
    <Container>
      {options.map((option, index) => (
        <Label key={index}>
          <Input
            type="checkbox"
            value={option}
            onChange={(e) => {
              if (e.target.checked) {
                handleChange([...items, e.target.value]);
              } else {
                handleChange(items.filter((item) => item !== e.target.value));
              }
            }}
          />
          <Option>{option}</Option>
        </Label>
      ))}
    </Container>
  );
};

export default CheckboxGroup;
