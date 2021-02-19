import React from "react";
import { useDispatch } from "react-redux";
import Input from "src/components/common/Input";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const RegisterTitle = () => {
  const { title } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setTitle(e.target.value));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>숙소의 제목을 만드세요.</h2>
        <h3>9단계</h3>
        <p>
          숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요.
        </p>
        <Input
          onChange={handleChange}
          value={title}
          style={{ width: 385, marginBottom: 24 }}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={!!title} nextHref="/room/register/price" />
    </>
  );
};

export default RegisterTitle;
