import React from "react";
import styled, { css } from "styled-components";
import palette from "~/styles/palette";
import WarningIcon from "~/public/static/svg/common/warning.svg";
import { useSelector } from "~/store";

const Container = styled.div``;

const RadioList = styled.div``;

const Label = styled.p`
  margin-bottom: 32px;
  color: ${palette.gray_76};
`;

const OptionLabel = styled.label`
  margin-bottom: 24px;
  line-height: 1.2;
  cursor: pointer;
  display: flex;
  position: relative;
`;

const Input = styled.input<{ isValid: boolean; validateMode: boolean }>`
  width: 16px;
  min-width: 16px;
  height: 16px;
  min-height: 16px;
  margin: 0;
  margin-right: 12px;
  margin-top: 1.5px;
  font-size: 16px;
  border: 1px solid ${palette.gray_b0};
  border-radius: 50px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  &:checked {
    background-color: ${palette.dark_cyan};
    border: none;
  }
  &:checked:after {
    position: absolute;
    background-color: white;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 6.5px;
    left: 5.5px;
  }
  ${({ isValid, validateMode }) =>
    !isValid &&
    validateMode &&
    css`
      border-color: ${palette.tawny};
      background-color: ${palette.snow};
    `}
`;

const Text = styled.div`
  cursor: pointer;
`;

const Title = styled.div``;

const Description = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 300;
`;

const Warning = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
  p {
    font-size: 12px;
    color: ${palette.davidson_orange};
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options?: { label: string; value: any; description?: string }[];
  errorMessage?: string;
  isValid?: boolean;
  radioValue?: string | null;
}

const RadioGroup = ({
  label,
  options = [],
  errorMessage = "옵션을 선택하세요.",
  isValid = false,
  radioValue,
  ...props
}: Props) => {
  const { validateMode } = useSelector((state) => state.common);
  return (
    <Container>
      <Label>{label}</Label>
      <RadioList>
        {options.map((option, index) => (
          <OptionLabel key={index}>
            <Input
              type="radio"
              value={option.value}
              checked={radioValue === option.value}
              isValid={isValid}
              validateMode={validateMode}
              {...props}
            />
            <Text>
              <Title>{option.label}</Title>
              <Description>{option.description}</Description>
            </Text>
          </OptionLabel>
        ))}
      </RadioList>
      {!isValid && validateMode && (
        <Warning>
          <WarningIcon />
          <p>{errorMessage}</p>
        </Warning>
      )}
    </Container>
  );
};

export default React.memo(RadioGroup);
