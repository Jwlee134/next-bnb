import { differenceInDays } from "date-fns";
import Link from "next/link";
import React from "react";
import { numberWithCommas } from "src/lib/utils";
import { useSelector } from "src/store";
import palette from "src/styles/palette";
import { RoomType } from "src/types/room";
import styled from "styled-components";

const Container = styled.div`
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
`;

const ImageContainer = styled.div`
  width: 100%;
  margin-bottom: 14px;
  img {
    width: 100%;
    height: 100%;
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

const RoomCard = ({ room, showMap }: { room: RoomType; showMap: boolean }) => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const remainDays =
    checkInDate &&
    checkOutDate &&
    differenceInDays(new Date(checkOutDate), new Date(checkInDate));

  return (
    <Container>
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
