import React from "react";
import { useDispatch } from "react-redux";
import Input from "src/components/common/Input";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import { numberWithCommas } from "src/lib/utils";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const RegisterPrice = () => {
  const { price } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // https://ninearies.tistory.com/177 정규식을 활용한 특정 문자 제거 방법
    const withoutCommas = Number(input.replace(/,/g, ""));

    if (!withoutCommas || withoutCommas === 0) {
      // withoutCommas가 NaN 이거나 0이라면
      dispatch(registerRoomActions.setPrice(0));
    }
    if (withoutCommas) {
      dispatch(registerRoomActions.setPrice(withoutCommas));
    }
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>숙소 요금 설정하기</h2>
        <h3>10단계</h3>
        <p>기본 요금</p>
        <Input
          value={numberWithCommas(String(price))}
          style={{ width: 385 }}
          onChange={handleChange}
          maxLength={16}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={true} nextHref="/room/register/date" />
    </>
  );
};

export default RegisterPrice;
