import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "src/components/common/Button";
import Counter from "src/components/common/Counter";
import Selector from "src/components/common/Selector";
import { bedTypes } from "src/lib/staticData";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import palette from "src/styles/palette";
import { BedType } from "src/types/room";

const BedList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 0px;
  border-top: 1px solid ${palette.gray_dd};
`;

const BedRoomTitle = styled.div`
  margin-bottom: 5px;
`;

const BedCounts = styled.div`
  margin-bottom: 5px;
  color: ${palette.gray_48};
  font-weight: 300;
`;

const BedsText = styled.div`
  color: ${palette.gray_48};
  font-weight: 300;
  font-size: 14px;
  line-height: 1.1;
  max-width: 320px;
`;

const CounterContainer = styled.div`
  margin: 18px 0px;
`;

const PublicBedTypes = () => {
  const { publicBedList } = useSelector((state) => state.registerRoom);

  const addedOptions = publicBedList.map((bed) => bed.type);

  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useDispatch();

  const toggleAdd = () => setIsAdd(!isAdd);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setPublicBedList(e.target.value as BedType));
  };

  const handleClick = (value: number, type: BedType) => {
    dispatch(registerRoomActions.setPublicBedCount({ value, type }));
  };

  const excludeActivatedBed = useMemo(() => {
    return bedTypes.filter((bed) => !addedOptions.includes(bed));
  }, [publicBedList]);

  const bedsText = useMemo(() => {
    return publicBedList.map((bed) => `${bed.type} ${bed.count}개`).join(", ");
  }, [publicBedList]);

  return (
    <BedList>
      <div>
        <BedRoomTitle>공용 공간</BedRoomTitle>
        <BedCounts>침대 {publicBedList.length}개</BedCounts>
        <BedsText>{bedsText}</BedsText>
        {isAdd &&
          publicBedList.map((bed, index) => (
            <CounterContainer key={index}>
              <Counter
                label={bed.type}
                value={bed.count}
                handleClick={(value) => handleClick(value, bed.type)}
              />
            </CounterContainer>
          ))}
        {isAdd && (
          <Selector
            options={excludeActivatedBed}
            type="register"
            value="다른 침대 추가"
            disabledValue="다른 침대 추가"
            style={{ width: 320, marginTop: 18 }}
            onChange={handleChange}
            isValid={true}
          />
        )}
      </div>
      <Button styleType="register" onClick={toggleAdd}>
        {isAdd && "완료"}
        {!isAdd && "침대 추가하기"}
      </Button>
    </BedList>
  );
};

export default PublicBedTypes;
