import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import palette from "src/styles/palette";

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

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...props }: Props) => {
  return <StyledTextarea {...props} />;
};

export default React.memo(Textarea);
