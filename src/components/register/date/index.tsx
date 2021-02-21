import React from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import DatePicker from "src/components/common/DatePicker";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import palette from "src/styles/palette";
import Checkbox from "src/components/common/Checkbox";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  input {
    width: 100%;
    height: 46px;
    padding: 0px 11px;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    outline: none;
    &::placeholder {
      color: ${palette.gray_76};
    }
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

const Title = styled.div`
  margin-bottom: 8px;
`;

const StartDate = styled.div`
  margin-right: 20px;
`;

const EndDate = styled.div``;

const RegisterDate = () => {
  const { startDate, endDate, anytime } = useSelector(
    (state) => state.registerRoom
  );
  const dispatch = useDispatch();

  const dateStartDate = startDate ? new Date(startDate) : null;
  const dateEndDate = endDate ? new Date(endDate) : null;

  const handleStart = (date: Date) => {
    dispatch(registerRoomActions.setStartDate(format(date, "yyyy-MM-dd")));
  };

  const handleEnd = (date: Date) => {
    dispatch(registerRoomActions.setEndDate(format(date, "yyyy-MM-dd")));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setAnytime(e.target.checked));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>예약 가능 여부 설정하기</h2>
        <h3>11단계</h3>
        <p />
        <DateContainer>
          <StartDate>
            <label>
              <Title>예약 시작일</Title>
              <DatePicker
                selected={dateStartDate}
                onChange={handleStart}
                selectsStart
                startDate={dateStartDate}
                endDate={dateEndDate}
                minDate={new Date()}
              />
            </label>
          </StartDate>
          <EndDate>
            <label>
              <Title>예약 마감일</Title>
              <DatePicker
                selected={dateEndDate}
                onChange={handleEnd}
                selectsEnd
                startDate={dateStartDate}
                endDate={dateEndDate}
                minDate={dateStartDate || new Date()}
              />
            </label>
          </EndDate>
        </DateContainer>
        <Checkbox
          option="언제든지 가능"
          checked={anytime}
          onChange={handleChange}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={true} nextHref="/room/register/checklist" />
    </>
  );
};

export default RegisterDate;
