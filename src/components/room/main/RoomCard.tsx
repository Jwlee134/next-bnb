import { differenceInDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { numberWithCommas } from "src/lib/utils";
import { useSelector } from "src/store";
import palette from "src/styles/palette";
import { RoomType } from "src/types/room";
import styled, { css } from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60%;
  margin-bottom: 14px;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TextContainer = styled.div``;

const Info = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  color: ${palette.gray_71};
  margin-bottom: 9px;
`;

const Title = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const Divider = styled.div``;

const DetailInfo = styled.div`
  display: none;
`;

const Price = styled.p`
  margin-bottom: 4px;
  b {
    font-weight: 800;
  }
`;

const TotalPrice = styled.p`
  font-size: 14px;
  color: ${palette.gray_71};
`;

const Container = styled.div<{ showMap: boolean }>`
  width: calc((100% - 48px) / 4);
  margin-right: 16px;
  margin-bottom: 32px;
  &:nth-child(4n) {
    margin-right: 0;
  }
  @media screen and (min-width: 1440px) {
    width: calc((100% - 64px) / 5);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
  ${({ showMap }) =>
    showMap &&
    css`
      width: 100% !important;
      margin: 0;
      padding: 24px 0px;
      border-bottom: 1px solid ${palette.gray_eb};
      &:first-child {
        padding-top: 0;
      }
      a {
        width: 100%;
        display: flex;
      }
      ${ImageContainer} {
        width: 300px;
        height: 200px;
        margin-right: 16px;
        margin-bottom: 0;
        border-radius: 8px;
        padding-bottom: 0;
      }
      ${TextContainer} {
        position: relative;
        flex-grow: 1;
        height: 200px;
      }
      ${Info} {
        font-size: 14px;
        margin-bottom: 13px;
      }
      ${Title} {
        font-size: 18px;
        margin-bottom: 11px;
      }
      ${Divider} {
        width: 32px;
        height: 1px;
        margin-bottom: 10px;
        background-color: ${palette.gray_dd};
      }
      ${Price} {
        position: absolute;
        margin: 0;
        right: 0;
        bottom: 17px;
      }
      ${TotalPrice} {
        position: absolute;
        margin: 0;
        right: 0;
        bottom: 0;
        text-decoration: underline;
      }
      ${DetailInfo} {
        display: block;
        font-size: 14px;
        color: ${palette.gray_71};
      }
    `}
`;

const RoomCard = ({ room, showMap }: { room: RoomType; showMap: boolean }) => {
  const { checkInDate, checkOutDate } = useSelector(
    (state) => state.searchRoom
  );

  const remainDays =
    checkInDate &&
    checkOutDate &&
    differenceInDays(new Date(checkOutDate), new Date(checkInDate));

  return (
    <Container showMap={showMap}>
      <Link href={`/room/${room.id}`}>
        <a>
          <ImageContainer>
            <img src={room.photos[0]} alt="" />
          </ImageContainer>
          <TextContainer>
            <Info>
              {room.buildingType} · {room.district} {room.city}
            </Info>
            <Title>{room.title}</Title>
            <Divider />
            <DetailInfo>
              인원 {room.maximumGuestCount}명, 침실 {room.bedroomCount}개, 침대{" "}
              {room.bedCount}개,{" "}
              {room.bathroomType === "private" ? "단독 사용 욕실" : "공용 욕실"}
            </DetailInfo>
            <Price>
              <b>₩{numberWithCommas(String(room.price))}</b>/1박
            </Price>
            {remainDays && (
              <TotalPrice>
                총 요금: ₩
                {numberWithCommas(`${Number(room.price) * remainDays}`)}
              </TotalPrice>
            )}
          </TextContainer>
        </a>
      </Link>
    </Container>
  );
};

export default RoomCard;
