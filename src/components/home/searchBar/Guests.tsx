import Link from "next/link";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import Button from "src/components/common/Button";
import Counter from "src/components/common/Counter";
import { useSelector } from "src/store";
import { searchRoomActions } from "src/store/searchRoom";
import palette from "src/styles/palette";
import styled from "styled-components";
import { makeQueryString } from "src/lib/utils";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  > div {
    width: 100%;
    height: 100%;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  width: calc(100% - 114px);
  top: 16px;
  left: 20px;
`;

const Label = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PopupContainer = styled.div`
  position: absolute;
  width: 394px;
  top: 78px;
  right: 0;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  padding: 16px 32px;
  cursor: default;
  background-color: white;
`;

const CounterContainer = styled.div`
  padding: 16px 0px;
  border-bottom: 1px solid ${palette.gray_eb};
  &:last-child {
    border: none;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 9px;
  top: 9px;
`;

const Guests = () => {
  const adultCount = useSelector((state) => state.searchRoom.adultCount);
  const childrenCount = useSelector((state) => state.searchRoom.childrenCount);
  const infantsCount = useSelector((state) => state.searchRoom.infantsCount);
  const searchRoom = useSelector((state) => state.searchRoom);
  const dispatch = useDispatch();

  const queryHref = makeQueryString("/room", searchRoom);

  const [openPopup, setOpenPopup] = useState(false);

  const guestsText = `성인 ${adultCount}명${
    childrenCount ? `, 어린이 ${childrenCount}명` : ""
  }${infantsCount ? `, 유아 ${infantsCount}명` : ""}`;

  return (
    <Container onClick={() => setOpenPopup(true)}>
      <OutsideClickHandler onOutsideClick={() => setOpenPopup(false)}>
        <TextContainer>
          <Label>인원</Label>
          <Text>{guestsText}</Text>
        </TextContainer>
        {openPopup && (
          <PopupContainer>
            <CounterContainer>
              <Counter
                onClick={(value) => {
                  dispatch(searchRoomActions.setAdultCount(value));
                }}
                label="성인"
                description="만 13세 이상"
                value={adultCount}
              />
            </CounterContainer>
            <CounterContainer>
              <Counter
                onClick={(value) => {
                  dispatch(searchRoomActions.setChildrenCount(value));
                }}
                label="어린이"
                description="만 2~12세"
                value={childrenCount}
              />
            </CounterContainer>
            <CounterContainer>
              <Counter
                onClick={(value) => {
                  dispatch(searchRoomActions.setInfantsCount(value));
                }}
                label="유아"
                description="만 2세 미만"
                value={infantsCount}
              />
            </CounterContainer>
          </PopupContainer>
        )}
        <ButtonContainer>
          <Link href={queryHref}>
            <a>
              <Button style={{ width: 60, backgroundColor: palette.amaranth }}>
                검색
              </Button>
            </a>
          </Link>
        </ButtonContainer>
      </OutsideClickHandler>
    </Container>
  );
};

export default Guests;
