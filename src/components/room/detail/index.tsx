import { isEmpty } from "lodash";
import React from "react";
import { useSelector } from "src/store";
import palette from "src/styles/palette";
import styled from "styled-components";
import Photos from "./Photos";
import BedIcon from "../../../../public/static/svg/room/detail/bed.svg";
import AmentityIcon from "./AmentityIcon";
import Reservation from "./Reservation";

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;
  padding-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Location = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  color: ${palette.gray_71};
  margin-bottom: 24px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailContainer = styled.div`
  width: 644px;
`;

const RoomType = styled.p`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const SpaceCount = styled.p`
  font-size: 14px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.gray_dd};
  margin: 32px 0px;
`;

const Description = styled.p`
  white-space: break-spaces;
  word-break: keep-all;
  line-height: 1.5;
`;

const BedTypeLabel = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const BedTypeList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const BedRoom = styled.li`
  width: calc((100% - 32px) / 3);
  padding: 26px 24px;
  border: 1px solid ${palette.gray_dd};
  border-radius: 12px;
  margin-right: 16px;
  margin-bottom: 16px;
  svg {
    margin-bottom: 12px;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const BedroomNumber = styled.p`
  font-weight: 500;
  margin-bottom: 12px;
`;

const BedTypeText = styled.p`
  font-size: 14px;
  line-height: 1.2;
`;

const AmentityLabel = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const AmentityList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Amentity = styled.li`
  width: 50%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  img {
    margin-right: 16px;
  }
`;

const Detail = () => {
  const room = useSelector((state) => state.room.detail);

  const getRoomType = () => {
    switch (room?.roomType) {
      case "entire":
        return "집 전체";
      case "private":
        return "개인실";
      default:
        return "";
    }
  };

  const getBedTypeText = (beds: { type: string; count: number }[]) => {
    return beds.map((bed) => `${bed.type} ${bed.count}개`).join(", ");
  };

  if (!room) return null;
  return (
    <Container>
      <Title>{room.title}</Title>
      <Location>
        {room.district}, {room.city}, {room.country}
      </Location>
      <Photos />
      <Contents>
        <DetailContainer>
          <RoomType>
            {room.host.firstname}님이 호스팅하는 {getRoomType()}
          </RoomType>
          <SpaceCount>
            인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개 · 침대{" "}
            {room.bedCount}개 · 욕실 {room.bathroomCount}개
          </SpaceCount>
          <Divider />
          <Description>{room.description}</Description>
          <Divider />
          {!isEmpty(room.bedroomDetail) && (
            <>
              <BedTypeLabel>침대/침구 유형</BedTypeLabel>
              <BedTypeList>
                {room.bedroomDetail.map((bedroom) => (
                  <BedRoom key={bedroom.id}>
                    <BedIcon />
                    <BedroomNumber>{bedroom.id}번 침실</BedroomNumber>
                    <BedTypeText>{getBedTypeText(bedroom.beds)}</BedTypeText>
                  </BedRoom>
                ))}
                <BedRoom>
                  <BedIcon />
                  <BedroomNumber>공용 공간</BedroomNumber>
                  <BedTypeText>
                    {getBedTypeText(room.publicBedList)}
                  </BedTypeText>
                </BedRoom>
              </BedTypeList>
              <Divider />
            </>
          )}
          {!isEmpty(room.amentities) && (
            <>
              <AmentityLabel>편의시설</AmentityLabel>
              <AmentityList>
                {room.amentities.map((amentity, index) => (
                  <Amentity key={index}>
                    <AmentityIcon amentity={amentity} />
                    {amentity}
                  </Amentity>
                ))}
              </AmentityList>
            </>
          )}
        </DetailContainer>
        <Reservation />
      </Contents>
    </Container>
  );
};

export default Detail;
