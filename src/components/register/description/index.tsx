import React from "react";
import { useDispatch } from "react-redux";
import Textarea from "src/components/common/Textarea";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const RegisterDescription = () => {
  const { description } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(registerRoomActions.setDescription(e.target.value));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
        <h3>8단계</h3>
        <p>
          숙소의 장점, 특별한 편의시설(예: 빠른 와이파이 또는 주차 시설)과 주변
          지역의 매력을 소개해주세요.
        </p>
        <Textarea value={description} onChange={handleChange} />
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={true} nextHref="/room/register/title" />
    </>
  );
};

export default RegisterDescription;
