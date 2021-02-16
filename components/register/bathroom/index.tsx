import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Counter from "~/components/common/Counter";
import RadioGroup from "~/components/common/RadioGroup";
import { useSelector } from "~/store";
import { registerRoomActions } from "~/store/registerRoom";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const RegisterBathroom = () => {
  const { bathroomCount, bathroomType } = useSelector(
    (state) => state.registerRoom
  );
  const dispatch = useDispatch();

  const handleClick = (value: number) => {
    dispatch(registerRoomActions.setBathroomCount(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerRoomActions.setBathroomType(
        e.target.value as "private" | "public"
      )
    );
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>욕실 수</h2>
        <h3>3단계</h3>
        <p>샤워룸 또는 욕조가 없는 경우 0.5개로 간주합니다.</p>
        <Counter
          label="욕실"
          value={bathroomCount}
          onClick={handleClick}
          unitNumber={0.5}
          style={{ width: 320, marginBottom: 32 }}
        />
        <RadioGroup
          label="게스트가 단독으로 사용하는 욕실인가요?"
          options={[
            { value: "private", label: "예" },
            { value: "public", label: "아니요, 공용입니다." },
          ]}
          style={{ width: 320 }}
          onChange={handleChange}
          radioValue={bathroomType}
          isValid={!!bathroomType}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter
        isValid={!!bathroomType}
        nextHref="/room/register/location"
      />
    </>
  );
};

export default RegisterBathroom;
