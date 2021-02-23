import React from "react";
import DatePicker from "src/components/common/DatePicker";
import useSearchRoomDate from "src/hooks/useSearchRoomDate";
import palette from "src/styles/palette";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
    .react-datepicker-wrapper {
      width: 100%;
      height: 100%;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
      }
    }
  }
  input {
    border-radius: 12px;
    width: 100%;
    outline: none;
    border: none;
    height: 100%;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 20px 0px 0px 20px;
    &::placeholder {
      font-size: 14px;
      opacity: 0.7;
    }
  }
`;

const Text = styled.p`
  position: absolute;
  top: 16px;
  left: 20px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  z-index: 1;
`;

const CheckIn = () => {
  const { checkInDate, checkOutDate, setCheckInDate } = useSearchRoomDate();

  const handleChange = (date: Date | null) => {
    if (date) setCheckInDate(date);
  };

  return (
    <Container>
      <TextContainer>
        <Text>체크인</Text>
        <DatePicker
          selected={checkInDate}
          selectsStart
          onChange={handleChange}
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          placeholderText="날짜 선택"
        />
      </TextContainer>
    </Container>
  );
};

export default CheckIn;
