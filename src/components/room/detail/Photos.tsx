import React from "react";
import { useSelector } from "src/store";
import styled, { css } from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%; // = height: width의 반
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  margin-bottom: 48px;
`;

const OnePhoto = styled.div`
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const FirstPhoto = styled.div<{ isOverFive: boolean }>`
  width: ${({ isOverFive }) => (isOverFive ? "50%" : "66.66%")};
  margin-right: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RestPhotos = styled.div<{ isOverFive: boolean }>`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    width: 100%;
    height: calc((100% - 8px) / 2);
    object-fit: cover;
  }
  ${({ isOverFive }) =>
    isOverFive &&
    css`
      width: 50%;
      flex-wrap: wrap;
      flex-direction: row;
      img {
        width: calc((100% - 8px) / 2);
        &:nth-child(3),
        :nth-child(4) {
          margin-top: 8px;
        }
      }
    `}
`;

const Photos = () => {
  const roomTitle = useSelector((state) => state.room.detail?.title);
  const photos = useSelector((state) => state.room.detail?.photos);

  if (!photos) return null;
  if (photos.length === 1) {
    return (
      <Container>
        <OnePhoto>
          <img src={photos[0]} alt={roomTitle} />
        </OnePhoto>
      </Container>
    );
  }
  if (photos.length < 4) {
    return (
      <Container>
        <PhotoContainer>
          <FirstPhoto isOverFive={false}>
            <img src={photos[0]} alt={roomTitle} />
          </FirstPhoto>
          <RestPhotos isOverFive={false}>
            <img src={photos[1]} alt={roomTitle} />
            {photos[2] && <img src={photos[2]} alt={roomTitle} />}
          </RestPhotos>
        </PhotoContainer>
      </Container>
    );
  }
  if (photos.length < 6) {
    return (
      <Container>
        <PhotoContainer>
          <FirstPhoto isOverFive={true}>
            <img src={photos[0]} alt={roomTitle} />
          </FirstPhoto>
          <RestPhotos isOverFive={true}>
            <img src={photos[1]} alt={roomTitle} />
            <img src={photos[2]} alt={roomTitle} />
            <img src={photos[3]} alt={roomTitle} />
            {photos[4] && <img src={photos[4]} alt={roomTitle} />}
          </RestPhotos>
        </PhotoContainer>
      </Container>
    );
  }
  return null;
};

export default Photos;
