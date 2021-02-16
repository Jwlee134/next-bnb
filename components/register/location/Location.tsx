import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import RegisterRoomFooter from "../RegisterRoomFooter";
import Selector from "~/components/common/Selector";
import { countryList } from "~/lib/staticData";
import { useSelector } from "~/store";
import { registerRoomActions } from "~/store/registerRoom";
import Input from "~/components/common/Input";

const RegisterRoomBody = styled.div``;

const InputContainer = styled.div`
  width: 385px;
`;

const InputFlexContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const RegisterLocation = () => {
  const {
    country,
    city,
    district,
    streetAddress,
    detailAddress,
    postcode,
  } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  // 나라 변경시
  const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(e.target.value));
  };
  // 시/도 변경시
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(e.target.value));
  };
  // 시/군/구 변경시
  const handleDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(e.target.value));
  };
  // 도로명주소 변경시
  const handleStreetAdress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setStreetAddress(e.target.value));
  };
  // 동호수 변경시
  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDetailAddress(e.target.value));
  };
  // 우편번호 변경시
  const handlePostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(e.target.value));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>숙소의 위치를 알려주세요.</h2>
        <h3>4단계</h3>
        <p>정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.</p>
        <Selector
          label="국가/지역"
          options={countryList}
          type="register"
          style={{ width: 320, marginBottom: 24 }}
          value={country || "국가/지역 선택"}
          disabledValue="국가/지역 선택"
          onChange={handleCountry}
          isValid={!!country}
        />
        <InputContainer>
          <InputFlexContainer>
            <Input
              label="시/도"
              style={{ marginRight: 18 }}
              onChange={handleCity}
              value={city}
              isValid={!!city}
            />
            <Input
              label="시/군/구"
              onChange={handleDistrict}
              value={district}
              isValid={!!district}
            />
          </InputFlexContainer>
          <Input
            label="도로명주소"
            style={{ marginBottom: 24 }}
            onChange={handleStreetAdress}
            value={streetAddress}
            isValid={!!streetAddress}
          />
          <Input
            label="동호수(선택사항)"
            style={{ marginBottom: 24 }}
            useValidation={false}
            onChange={handleDetailAddress}
            value={detailAddress}
          />
          <Input
            label="우편변호"
            style={{ marginBottom: 24 }}
            onChange={handlePostcode}
            value={postcode}
            isValid={!!postcode}
          />
        </InputContainer>
      </RegisterRoomBody>
      <RegisterRoomFooter
        isValid={
          !!country || !!city || !!district || !!streetAddress || !!postcode
        }
        nextHref="/room/register/geometry"
      />
    </>
  );
};

export default RegisterLocation;
