import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import styled from "styled-components";
import { isEmpty } from "lodash";
import palette from "src/styles/palette";
import RegisterRoomFooter from "../RegisterRoomFooter";
import CheckStep from "./CheckStep";

const RegisterRoomBody = styled.div``;

const RegisterChecklist = () => {
  const registerRoom = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  const isBuildingTypeActived = useMemo(() => {
    const {
      largeBuildingType,
      buildingType,
      roomType,
      isForGuest,
    } = registerRoom;
    if (!largeBuildingType || !buildingType || !roomType || !isForGuest) {
      return false;
    }
    return true;
  }, []);

  const isRoomTypeActived = useMemo(() => {
    const { maximumGuestCount, bedroomCount, bedCount } = registerRoom;
    if (
      !isBuildingTypeActived ||
      !maximumGuestCount ||
      !bedroomCount ||
      !bedCount
    ) {
      return false;
    }
    return true;
  }, []);

  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!isRoomTypeActived || !bathroomCount || !bathroomType) {
      return false;
    }
    return true;
  }, []);

  const isLocationActived = useMemo(() => {
    const { country, city, district, streetAddress, postcode } = registerRoom;
    if (
      !isBathroomActived ||
      !country ||
      !city ||
      !district ||
      !streetAddress ||
      !postcode
    ) {
      return false;
    }
    return true;
  }, []);

  const isAmentitiesActived = useMemo(() => {
    if (!isLocationActived) return false;
    return true;
  }, []);

  const isConveniencesActived = useMemo(() => {
    if (!isAmentitiesActived) return false;
    return true;
  }, []);

  const isPhotosActived = useMemo(() => {
    const { photos } = registerRoom;
    if (!isConveniencesActived || isEmpty(photos)) return false;
    return true;
  }, []);

  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!isPhotosActived || !description) return false;
    return true;
  }, []);

  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!isDescriptionActived || !title) return false;
    return true;
  }, []);

  const isPriceActived = useMemo(() => {
    if (!isTitleActived) return false;
    return true;
  }, []);

  const isDateActived = useMemo(() => {
    if (!isPriceActived) return false;
    return true;
  }, []);

  const stepInProgress = useMemo(() => {
    if (!isBuildingTypeActived) {
      return "building";
    }
    if (!isRoomTypeActived) {
      return "bedrooms";
    }
    if (!isBathroomActived) {
      return "bathroom";
    }
    if (!isLocationActived) {
      return "location";
    }
    if (!isAmentitiesActived) {
      return "amentities";
    }
    if (!isConveniencesActived) {
      return "conviniences";
    }
    if (!isPhotosActived) {
      return "photo";
    }
    if (!isDescriptionActived) {
      return "description";
    }
    if (!isTitleActived) {
      return "title";
    }
    if (!isDateActived) {
      return "date";
    }
    return "";
  }, []);

  return (
    <>
      <RegisterRoomBody>
        <p>숙소를 등록한 후 언제든 숙소를 수정할 수 있습니다.</p>
        <CheckStep
          step="숙소 유형"
          href="/room/register/building"
          disabled={!isBuildingTypeActived}
          inProgress={stepInProgress === "building"}
        />
        <CheckStep
          step="숙소 종류"
          href="/room/register/bedrooms"
          disabled={!isRoomTypeActived}
          inProgress={stepInProgress === "bedrooms"}
        />
        <CheckStep
          step="욕실"
          href="/room/register/bathroom"
          disabled={!isBathroomActived}
          inProgress={stepInProgress === "bathroom"}
        />
        <CheckStep
          step="위치"
          href="/room/register/location"
          disabled={!isLocationActived}
          inProgress={stepInProgress === "location"}
        />
        <CheckStep
          step="편의 시설"
          href="/room/register/amentities"
          disabled={!isAmentitiesActived}
          inProgress={stepInProgress === "amentities"}
        />
        <CheckStep
          step="공용 공간"
          href="/room/register/conveniences"
          disabled={!isConveniencesActived}
          inProgress={stepInProgress === "conviniences"}
        />
        <CheckStep
          step="사진"
          href="/room/register/photo"
          disabled={!isPhotosActived}
          inProgress={stepInProgress === "photo"}
        />
        <CheckStep
          step="설명"
          href="/room/register/description"
          disabled={!isDescriptionActived}
          inProgress={stepInProgress === "description"}
        />
        <CheckStep
          step="제목"
          href="/room/register/title"
          disabled={!isTitleActived}
          inProgress={stepInProgress === "title"}
        />
        <CheckStep
          step="요금"
          href="/room/register/price"
          disabled={false}
          inProgress={false}
        />
        <CheckStep
          step="예약 날짜"
          href="/room/register/date"
          disabled={!isDateActived}
          inProgress={stepInProgress === "date"}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter
        submit={!stepInProgress && true}
        isValid={true}
        nextHref="/room/register/checklist"
      />
    </>
  );
};

export default RegisterChecklist;
