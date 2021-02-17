import React from "react";
import { useDispatch } from "react-redux";
import CheckboxGroup from "src/components/common/CheckboxGroup";
import { amentityList } from "src/lib/staticData";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const RegisterAmentities = () => {
  const dispatch = useDispatch();

  const { amentities } = useSelector((state) => state.registerRoom);

  const handleChange = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>어떤 편의 시설을 제공하시나요?</h2>
        <h3>5단계</h3>
        <p>
          일반적으로 게스트가 기대하는 편의 시설 목록입니다. 숙소를 등록한
          후에도 언제든지 편의 시설을 추가할 수 있어요.
        </p>
        <CheckboxGroup
          items={amentities}
          options={amentityList}
          handleChange={handleChange}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter
        isValid={true}
        nextHref="/room/register/conveniences"
      />
    </>
  );
};

export default RegisterAmentities;
