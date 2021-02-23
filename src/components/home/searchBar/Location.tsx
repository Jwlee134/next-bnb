import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import useDebounce from "src/hooks/useDebounce";
import { getPlaceAPI, searchPlacesAPI } from "src/lib/api/map";
import { useSelector } from "src/store";
import { searchRoomActions } from "src/store/searchRoom";
import palette from "src/styles/palette";
import styled from "styled-components";

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
`;

const TextContainer = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  top: 16px;
  left: 20px;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  &::placeholder {
    font-size: 14px;
    opacity: 0.7;
  }
`;

const LocationResults = styled.ul`
  position: absolute;
  width: 400px;
  top: 78px;
  padding: 16px 0px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 32px;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 8px 32px;
  cursor: pointer;
  border-radius: 12px;
  line-height: 1.2;
  &:hover {
    background-color: ${palette.gray_f7};
  }
`;

const Location = () => {
  const location = useSelector((state) => state.searchRoom.location);
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [results, setResults] = useState<
    { description: string; placeId: string }[]
  >([]);

  const searchKeyword = useDebounce(location, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchRoomActions.setLocation(e.target.value));
  };

  const handleClick = () => {
    setOpenPopup(true);
    if (inputRef.current) inputRef.current.focus();
  };

  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(location);
      setResults(data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const nearPlaces = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch(searchRoomActions.setLocation("근처 추천 장소"));
        dispatch(searchRoomActions.setLatitude(coords.latitude));
        dispatch(searchRoomActions.setLongitude(coords.longitude));
        setOpenPopup(false);
      },
      (e) => {
        alert(e.message);
      }
    );
  };

  const handleResult = async (id: string, description: string) => {
    try {
      const {
        data: { latitude, longitude },
      } = await getPlaceAPI(id);
      dispatch(searchRoomActions.setLocation(description));
      dispatch(searchRoomActions.setLatitude(latitude));
      dispatch(searchRoomActions.setLongitude(longitude));
      setOpenPopup(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    if (searchKeyword) searchPlaces();
    if (!searchKeyword) setResults([]);
  }, [searchKeyword]);

  return (
    <Container onClick={handleClick}>
      <OutsideClickHandler onOutsideClick={() => setOpenPopup(false)}>
        <TextContainer>
          <Text>위치</Text>
          <Input
            ref={inputRef}
            value={location}
            placeholder="어디로 여행가세요?"
            onChange={handleChange}
          />
        </TextContainer>
        {openPopup && (
          <LocationResults>
            {!location && <List onClick={nearPlaces}>근처 추천 장소</List>}
            {!isEmpty(results) &&
              results.map((result, index) => (
                <List
                  key={index}
                  onClick={() => {
                    handleResult(result.placeId, result.description);
                  }}
                >
                  {result.description}
                </List>
              ))}
            {location && isEmpty(results) && <List>검색 결과가 없습니다.</List>}
          </LocationResults>
        )}
      </OutsideClickHandler>
    </Container>
  );
};

export default Location;
