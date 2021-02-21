import React from "react";
import styled, { css } from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import palette from "src/styles/palette";
import useValidateMode from "src/hooks/useValidateMode";

interface TextareaProps {
  isValid: boolean;
  validateMode: boolean;
}

const Container = styled.div<TextareaProps>`
  ${({ isValid, validateMode }) =>
    !isValid &&
    validateMode &&
    css`
      textarea {
        border-color: ${palette.tawny};
        background-color: ${palette.snow};
      }
    `}
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 429px;
  min-height: 216px;
  margin-bottom: 24px;
  padding: 11px;
  outline: none;
  resize: none;
  border-radius: 4px;
  border: 1px solid ${palette.gray_eb};
  &::placeholder {
    color: ${palette.gray_76};
  }
  &:focus {
    border-color: ${palette.dark_cyan};
  }
`;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isValid?: boolean;
}

const Textarea = ({ isValid = true, ...props }: Props) => {
  const { validateMode } = useValidateMode();
  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <StyledTextarea {...props} />
    </Container>
  );
};

export default React.memo(Textarea);
