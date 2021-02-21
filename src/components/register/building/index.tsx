import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  apartmentBuildingTypeList,
  largeBuildingTypeList,
  houseBuildingTypeList,
  secondaryUnitBuildingTypeList,
  uniqueSpaceBuildingTypeList,
  bnbBuildingTypeList,
  boutiquesHotelBuildingTypeList,
  roomTypeRadioOptions,
  isSetUpForGuestOptions,
} from "src/lib/staticData";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import Selector from "src/components/common/Selector";
import RadioGroup from "src/components/common/RadioGroup";
import RegisterRoomFooter from "../RegisterRoomFooter";

const RegisterRoomBody = styled.div``;

const BuildingSelector = styled.div`
  width: 320px;
  margin-bottom: 32px;
`;

const RadioOptions = styled.div`
  max-width: 485px;
  margin-bottom: 50px;
`;

const RegisterBuilding = () => {
  const { largeBuildingType, buildingType, roomType, isForGuest } = useSelector(
    (state) => state.registerRoom
  );

  const dispatch = useDispatch();

  const handleLargeBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setlargeBuildingType(e.target.value));
    dispatch(registerRoomActions.setBuildingType(null));
  };

  const handleBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(e.target.value));
  };

  const handleRoomTypeRadioOptions = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      registerRoomActions.setRoomType(
        e.target.value as "entire" | "private" | "public"
      )
    );
  };

  const handleIsSetUpForGuestOptions = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setIsForGuest(e.target.value as "yes" | "no"));
  };

  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트":
        return apartmentBuildingTypeList;
      case "주택":
        return houseBuildingTypeList;
      case "별채":
        return secondaryUnitBuildingTypeList;
      case "독특한 숙소":
        return uniqueSpaceBuildingTypeList;
      case "B&B":
        return bnbBuildingTypeList;
      case "부티크호텔":
        return boutiquesHotelBuildingTypeList;
      default:
        return [];
    }
  }, [largeBuildingType]);

  return (
    <>
      <RegisterRoomBody>
        <h2>등록하실 숙소 종류는 무엇인가요?</h2>
        <h3>1단계</h3>
        <BuildingSelector>
          <Selector
            options={largeBuildingTypeList}
            label="우선 범위를 좁혀볼까요?"
            value={largeBuildingType || "하나를 선택해주세요."}
            disabledValue="하나를 선택해주세요."
            type="register"
            onChange={handleLargeBuildingType}
            isValid={!!largeBuildingType}
            showErrorMessage={true}
          />
        </BuildingSelector>
        {largeBuildingType && (
          <BuildingSelector>
            <Selector
              options={detailBuildingOptions}
              label="건물 유형을 선택하세요."
              value={buildingType || "하나를 선택해주세요."}
              disabledValue="하나를 선택해주세요."
              type="register"
              onChange={handleBuildingType}
              isValid={!!buildingType}
              showErrorMessage={true}
            />
          </BuildingSelector>
        )}
        {buildingType && (
          <>
            <RadioOptions>
              <RadioGroup
                label="게스트가 묵게 될 숙소 유형을 골라주세요."
                options={roomTypeRadioOptions}
                onChange={handleRoomTypeRadioOptions}
                radioValue={roomType}
                isValid={!!roomType}
              />
            </RadioOptions>
            <RadioOptions>
              <RadioGroup
                label="게스트만 사용하도록 만들어진 숙소인가요?"
                options={isSetUpForGuestOptions}
                onChange={handleIsSetUpForGuestOptions}
                radioValue={isForGuest}
                isValid={!!isForGuest}
              />
            </RadioOptions>
          </>
        )}
      </RegisterRoomBody>
      <RegisterRoomFooter
        isValid={
          !!largeBuildingType && !!buildingType && !!roomType && !!isForGuest
        }
        nextHref="/room/register/bedrooms"
      />
    </>
  );
};

export default RegisterBuilding;
