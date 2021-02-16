import React from "react";
import styled from "styled-components";
import CounterMinusIcon from "~/public/static/svg/common/counter/counter_minus.svg";
import CounterPlusIcon from "~/public/static/svg/common/counter/counter_plus.svg";
import palette from "~/styles/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    color: ${palette.gray_48};
    p {
      font-size: 14px;
      color: ${palette.gray_71};
      margin-top: 4px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: 1px solid ${palette.dark_cyan};
    background-color: white;
    font-size: 21px;
    cursor: pointer;
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
`;

interface Props {
  label: string;
  value: number;
  description?: string;
  minValue?: number;
  unitNumber?: number;
  onClick: (value: number) => void;
  style?: Object;
}

const Counter = ({
  label,
  value = 1,
  description,
  minValue = 0,
  unitNumber = 1,
  onClick,
  style,
}: Props) => {
  return (
    <Container style={style}>
      <label>
        {label}
        {description && <p>{description}</p>}
      </label>
      <ButtonContainer>
        <button
          type="button"
          disabled={value === minValue}
          onClick={() => onClick(value - unitNumber)}
        >
          <CounterMinusIcon />
        </button>
        <span>{value}</span>
        <button type="button" onClick={() => onClick(value + unitNumber)}>
          <CounterPlusIcon />
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default React.memo(Counter);
