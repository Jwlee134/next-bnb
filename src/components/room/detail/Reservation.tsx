import React, { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Button from "src/components/common/Button";
import DatePicker from "src/components/common/DatePicker";
import { useSelector } from "src/store";
import palette from "src/styles/palette";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  width: 362px;
  height: fit-content;
  background-color: white;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  top: 128px;
  border-radius: 12px;
  padding: 24px 24px 16px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid ${palette.gray_71};
  border-radius: 8px;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${palette.gray_71};
`;

const CheckIn = styled.div`
  position: relative;
  top: 0;
  left: 0;
  border-radius: 8px 0 0 0;
  width: 50%;
  height: 100%;
  label {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 12px;
    cursor: pointer;
    border-right: 1px solid ${palette.gray_71};
    font-size: 10px;
    font-weight: 600;
    input {
      border: none;
      outline: none;
      width: 100%;
      margin-top: 7px;
      padding: 0;
    }
  }
`;

const CheckOut = styled.div`
  position: relative;
  top: 0;
  right: 0;
  border-radius: 8px 0 0 0;
  width: 50%;
  height: 100%;
  label {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 12px;
    cursor: pointer;
    font-size: 10px;
    font-weight: 600;
    input {
      border: none;
      outline: none;
      width: 100%;
      margin-top: 7px;
      padding: 0;
    }
  }
`;

const GuestContainer = styled.div`
  width: 100%;
  height: 56px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    display: block;
    font-size: 10px;
    font-weight: 600;
    margin-bottom: 7px;
  }
  p {
    font-size: 14px;
    color: ${palette.gray_71};
  }
`;

const Reservation = () => {
  const room = useSelector((state) => state.room.detail);
  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);

  const checkInRef = useRef<HTMLLabelElement>(null);
  const checkOutRef = useRef<HTMLLabelElement>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleClick = () => {
    if (checkInRef.current && !startDate) {
      checkInRef.current.focus();
    } else if (checkOutRef.current && !endDate) {
      checkOutRef.current.focus();
    }
  };

  return (
    <Container>
      <Title>요금을 확인하려면 날짜를 입력하세요.</Title>
      <InputContainer>
        <DateContainer>
          <CheckIn>
            <label ref={checkInRef}>
              체크인
              <DatePicker
                popperPlacement="top-end"
                placeholderText="날짜 추가"
                onChange={(date) => setStartDate(date as Date)}
                selectsStart
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                minDate={
                  room?.startDate ? new Date(room.startDate) : new Date()
                }
                maxDate={room?.endDate ? new Date(room.endDate) : null}
              />
            </label>
          </CheckIn>
          <CheckOut>
            <label ref={checkOutRef}>
              체크아웃
              <DatePicker
                popperPlacement="top-end"
                placeholderText="날짜 추가"
                onChange={(date) => setEndDate(date as Date)}
                selectsEnd
                selected={endDate}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={room?.endDate ? new Date(room.endDate) : null}
              />
            </label>
          </CheckOut>
        </DateContainer>
        <GuestContainer>
          <span>인원</span>
          <p>
            성인 {adultCount}명{" "}
            {childrenCount !== 0 && ` ,어린이 ${childrenCount}명`}
            {infantsCount !== 0 && ` ,유아 ${infantsCount}명`}
          </p>
        </GuestContainer>
      </InputContainer>
      <Button onClick={handleClick}>
        {startDate && endDate ? "예약하기" : "예약 가능 여부 보기"}
      </Button>
    </Container>
  );
};

export default Reservation;
