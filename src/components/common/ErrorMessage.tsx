import React from "react";
import styled from "styled-components";
import palette from "src/styles/palette";

const Text = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${palette.tawny};
`;

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <Text>{children}</Text>
);

export default ErrorMessage;
