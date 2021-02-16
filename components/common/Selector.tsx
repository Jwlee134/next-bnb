import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "~/store";
import palette from "~/styles/palette";
import WarningIcon from "~/public/static/svg/common/warning.svg";

interface ContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: "normal" | "register";
}

const normalSelectorStyle = css`
  height: 46px;
  border: 1px solid ${palette.gray_eb};
  border-radius: 4px;
  padding: 0px 11px;
  background: right 11px center no-repeat
    url("/static/svg/common/selector/down_arrow.svg");
`;

const RegisterSelectorStyle = css`
  height: 56px;
  border: 1px solid ${palette.gray_b0};
  border-radius: 8px;
  padding: 0px 14px 0px 12px;
  background: right 14px center no-repeat
    url("/static/svg/common/selector/register_selector_down_arrow.svg");
`;

const Container = styled.div<ContainerProps>`
  width: 100%;
  span {
    display: block;
    color: ${palette.gray_76};
    font-weight: 500;
    margin-bottom: 8px;
  }
  select {
    ${({ type }) => type === "normal" && normalSelectorStyle};
    ${({ type }) => type === "register" && RegisterSelectorStyle};
    width: 100%;
    background-color: white;
    outline: none;
    font-size: 14px;
    -webkit-appearance: none;
    cursor: pointer;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
    ${({ isValid, validateMode }) =>
      validateMode &&
      css`
        border-color: ${isValid ? palette.dark_cyan : palette.tawny};
        background-color: ${isValid ? "white" : palette.snow};
      `}
    &:disabled {
      background-image: url("/static/svg/common/selector/disabled_register_selector_down_arrow.svg");
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_e5};
      color: ${palette.gray_e5};
      cursor: not-allowed;
    }
  }
`;

const Warning = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  svg {
    margin-right: 4px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${palette.davidson_orange};
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  isValid?: boolean;
  label?: string;
  showErrorMessage?: boolean;
  errorMessage?: string;
  type?: "normal" | "register";
  disabledValue?: string;
}

const Selector = ({
  options = [],
  isValid = false,
  style,
  label,
  showErrorMessage = false,
  errorMessage = "옵션을 선택해주세요.",
  type = "normal",
  disabledValue,
  ...props
}: Props) => {
  const { validateMode } = useSelector((state) => state.common);
  return (
    <Container
      style={style}
      isValid={isValid}
      validateMode={validateMode}
      type={type}
    >
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledValue && (
            <option value={disabledValue} disabled>
              {disabledValue}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {!isValid && showErrorMessage && validateMode && (
        <Warning>
          <WarningIcon />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </Warning>
      )}
    </Container>
  );
};

export default React.memo(Selector); // props의 값이 같다면 리렌더링을 방지하는 목적
