import React from "react";
import styled, { css } from "styled-components";
import useValidateMode from "~/hooks/useValidateMode";
import palette from "~/styles/palette";
import ErrorMessage from "./ErrorMessage";

interface ContainerProps {
  icon: JSX.Element | undefined;
  isValid: boolean;
  validateMode: boolean;
  useValidation: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  span {
    display: block;
    color: ${palette.gray_76};
    font-weight: 500;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    height: 46px;
    padding: ${({ icon }) => (icon ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
  ${({ validateMode, isValid, useValidation }) =>
    validateMode &&
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
      }
    `}
`;

const IconContainer = styled.div`
  position: absolute;
  right: 13px;
  top: 13px;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  style?: Object;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  label?: string;
}

const Input = ({
  icon,
  style,
  isValid = false,
  useValidation = true,
  errorMessage,
  label,
  ...props
}: Props) => {
  const { validateMode } = useValidateMode();
  return (
    <Container
      icon={icon}
      style={style}
      isValid={isValid}
      validateMode={validateMode}
      useValidation={useValidation}
    >
      {label && <span>{label}</span>}
      <input {...props} />
      <IconContainer>{icon}</IconContainer>
      {!isValid && useValidation && validateMode && errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default React.memo(Input); // props의 값이 같다면 리렌더링을 방지하는 목적
