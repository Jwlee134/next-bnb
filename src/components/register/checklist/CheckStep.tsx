import Link from "next/link";
import React from "react";
import Button from "src/components/common/Button";
import palette from "src/styles/palette";
import styled from "styled-components";

import CheckMarkIcon from "../../../../public/static/svg/register/dark_cyan_check_mark.svg";

const Container = styled.div`
  padding-bottom: 16px;
  width: fit-content;
  a {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 12px;
  }
  span {
    font-weight: 500;
    text-decoration: underline;
  }
`;

const InProgress = styled.a`
  margin-left: 28px;
`;

const ButtonContainer = styled.a`
  margin: 8px 0 0 28px;
`;

const Disabled = styled.a`
  margin-left: 28px;
  color: ${palette.gray_76};
`;

interface Props {
  disabled: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

const CheckStep = ({ disabled, inProgress, step, href }: Props) => {
  if (inProgress) {
    return (
      <Container>
        <Link href={href}>
          <InProgress>
            <span>{step}</span>
          </InProgress>
        </Link>
        <Link href={href}>
          <ButtonContainer>
            <Button
              style={{
                width: 56,
                height: 36,
                backgroundColor: palette.dark_cyan,
              }}
            >
              계속
            </Button>
          </ButtonContainer>
        </Link>
      </Container>
    );
  }
  if (disabled) {
    return (
      <Container>
        <Disabled>{step}</Disabled>
      </Container>
    );
  }
  return (
    <Container>
      <Link href={href}>
        <a>
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </Container>
  );
};

export default CheckStep;
