import React, { useMemo } from "react";
import { useSelector } from "src/store";
import styled from "styled-components";
import { isEmpty } from "lodash";
import RegisterRoomFooter from "../RegisterRoomFooter";
import CheckStep from "./CheckStep";

const RegisterRoomBody = styled.div``;

const RegisterChecklist = () => {
  const registerRoom = useSelector((state) => state.registerRoom);

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
    if (!maximumGuestCount || !bedroomCount || !bedCount) {
      return false;
    }
    return true;
  }, []);

  const isBathroomActived = useMemo(() => {
    const { bathroomCount, bathroomType } = registerRoom;
    if (!bathroomCount || !bathroomType) {
      return false;
    }
    return true;
  }, []);

  const isLocationActived = useMemo(() => {
    const { country, city, district, streetAddress, postcode } = registerRoom;
    if (!country || !city || !district || !streetAddress || !postcode) {
      return false;
    }
    return true;
  }, []);

  const isPhotosActived = useMemo(() => {
    const { photos } = registerRoom;
    if (isEmpty(photos)) return false;
    return true;
  }, []);

  const isDescriptionActived = useMemo(() => {
    const { description } = registerRoom;
    if (!description) return false;
    return true;
  }, []);

  const isTitleActived = useMemo(() => {
    const { title } = registerRoom;
    if (!title) return false;
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
    if (!isPhotosActived) {
      return "photo";
    }
    if (!isDescriptionActived) {
      return "description";
    }
    if (!isTitleActived) {
      return "title";
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
          disabled={false}
          inProgress={false}
        />
        <CheckStep
          step="공용 공간"
          href="/room/register/conveniences"
          disabled={false}
          inProgress={false}
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
          disabled={false}
          inProgress={false}
        />
      </RegisterRoomBody>
      <RegisterRoomFooter
        submit={!stepInProgress && true}
        isValid={true}
        nextHref={`/room/register/${stepInProgress}`}
      />
    </>
  );
};

export default RegisterChecklist;
