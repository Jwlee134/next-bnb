import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useValidateMode from "~/hooks/useValidateMode";
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
} from "~/lib/staticData";
import { useSelector } from "~/store";
import { registerRoomActions } from "~/store/registerRoom";
import palette from "~/styles/palette";
import RadioGroup from "../common/RadioGroup";
import Selector from "../common/Selector";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 0px 30px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: 500;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

const RegisterRoomBody = styled.div``;

const BuildingSelector = styled.div`
  width: 320px;
  margin-bottom: 32px;
`;

const RadioOptions = styled.div`
  max-width: 485px;
  margin-bottom: 50px;
`;

const RegisterRoomBuilding = () => {
  const { largeBuildingType, buildingType, roomType, isForGuest } = useSelector(
    (state) => state.registerRoom
  );

  const dispatch = useDispatch();

  const { validateMode, setValidateMode } = useValidateMode();

  const handleLargeBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (validateMode) {
      setValidateMode(false);
    }
    dispatch(registerRoomActions.setlargeBuildingType(e.target.value));
  };

  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case "아파트":
        dispatch(
          registerRoomActions.setBuildingType(apartmentBuildingTypeList[0])
        );
        return apartmentBuildingTypeList;
      case "주택":
        dispatch(registerRoomActions.setBuildingType(houseBuildingTypeList[0]));
        return houseBuildingTypeList;
      case "별채":
        dispatch(
          registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0])
        );
        return secondaryUnitBuildingTypeList;
      case "독특한 숙소":
        dispatch(
          registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0])
        );
        return uniqueSpaceBuildingTypeList;
      case "B&B":
        dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      case "부티크호텔":
        dispatch(
          registerRoomActions.setBuildingType(boutiquesHotelBuildingTypeList[0])
        );
        return boutiquesHotelBuildingTypeList;
      default:
        return [];
    }
  }, [largeBuildingType]);

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

  return (
    <Container>
      <RegisterRoomBody>
        <h2>등록하실 숙소 종류는 무엇인가요?</h2>
        <h3>1단계</h3>
        <BuildingSelector>
          <Selector
            options={largeBuildingTypeList}
            label="우선 범위를 좁혀볼까요?"
            defaultValue="하나를 선택해주세요."
            value={largeBuildingType || undefined}
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
              value={buildingType || undefined}
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
    </Container>
  );
};

export default RegisterRoomBuilding;
