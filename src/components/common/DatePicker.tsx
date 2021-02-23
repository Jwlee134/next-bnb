import React from "react";
import styled from "styled-components";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import ko from "date-fns/locale/ko";

import "react-datepicker/dist/react-datepicker.css";
import palette from "src/styles/palette";

const Container = styled.div`
  .react-datepicker {
    padding: 16px 32px;
    background-color: white;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
  }
  .react-datepicker__triangle {
    border-bottom-color: white;
  }
  .react-datepicker__month-container {
    padding: 0px 27px;
  }
  .react-datepicker__header {
    padding-top: 22px;
    background-color: white;
    border: 0;
  }
  .react-datepicker__navigation {
    top: 40px;
    border: 0;
    background-repeat: no-repeat;
    outline: none;
  }
  .react-datepicker__navigation--previous {
    left: 56px;
    background-image: url("/static/svg/common/datePicker/datepicker_left_arrow.svg");
  }
  .react-datepicker__navigation--next {
    right: 56px;
    background-image: url("/static/svg/common/datePicker/datepicker_right_arrow.svg");
  }
  .react-datepicker__current-month {
    font-family: Airbnb Cereal, sans-serif;
  }
  .react-datepicker__day-names {
    padding-top: 16px;
  }
  .react-datepicker__day-name {
    width: 48px;
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${palette.gray_71};
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__day {
    width: 48px;
    height: 48px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 14px;
    color: ${palette.black};
    outline: none;
    &:hover {
      border: 1px solid ${palette.black};
      color: ${palette.black};
      background-color: white;
      border-radius: 50%;
    }
  }
  .react-datepicker__day--in-range {
    background-color: ${palette.gray_f7};
  }
  .react-datepicker__day--in-selecting-range {
    background-color: ${palette.gray_f7};
  }
  .react-datepicker__day--selected {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
    &:hover {
      background-color: ${palette.black};
      color: white;
    }
  }
  .react-datepicker__day--range-start {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--range-end {
    background-color: ${palette.black};
    color: white;
    border-radius: 50%;
  }
  .react-datepicker__day--disabled {
    color: ${palette.gray_dd};
    cursor: no-drop;
    &:hover {
      border: 0;
    }
  }
`;

const DatePicker = ({ ...props }: ReactDatePickerProps) => (
  <Container>
    <ReactDatePicker
      {...props}
      disabledKeyboardNavigation
      locale={ko}
      dateFormat="MM월 dd일"
    />
  </Container>
);

export default DatePicker;
