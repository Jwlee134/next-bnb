import React from "react";
import { useDispatch } from "react-redux";
import CheckboxGroup from "src/components/common/CheckboxGroup";
import { convinienceList } from "src/lib/staticData";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const RegisterConveniences = () => {
  const dispatch = useDispatch();

  const { conveniences } = useSelector((state) => state.registerRoom);

  const handleChange = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>게스트가 어떤 공간을 사용할 수 있나요?</h2>
        <h3>6단계</h3>
        <p>
          등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.
        </p>
        <CheckboxGroup
          items={conveniences}
          options={convinienceList}
          handleChange={handleChange}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={true} nextHref="/room/register/photo" />
    </>
  );
};

export default RegisterConveniences;
