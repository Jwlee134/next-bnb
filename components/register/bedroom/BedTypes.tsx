import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "~/components/common/Button";
import Counter from "~/components/common/Counter";
import Selector from "~/components/common/Selector";
import { bedTypes } from "~/lib/staticData";
import { registerRoomActions } from "~/store/registerRoom";
import palette from "~/styles/palette";
import { BedType } from "~/types/room";

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

interface Props {
  bedroom: {
    id: number;
    beds: {
      type: BedType;
      count: number;
    }[];
  };
}

const BedTypes = ({ bedroom }: Props) => {
  // 현재 침실에 있는 침대의 타입만 모아 새로운 배열로 반환 ["싱글", "더블", ...]
  const bedOptions = bedroom.beds.map((bed) => bed.type);

  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useDispatch();

  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  // 현재 침실의 배열에 포함되어 있지 않은 것들(false)을 모아 새로운 배열로 반환
  const excludeActivatedBed = useMemo(() => {
    return bedTypes.filter((bedType) => !bedOptions.includes(bedType));
  }, [bedroom]);

  const toggleAdd = () => setIsAdd(!isAdd);

  const handleClick = (value: number, id: number, bed: BedType) => {
    dispatch(registerRoomActions.setBedTypeCount({ value, id, type: bed }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      registerRoomActions.setBedType({
        id: bedroom.id,
        type: e.target.value as BedType,
      })
    );
  };

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(", ");
  }, [bedroom]);

  return (
    <BedList>
      <div>
        <BedRoomTitle>{bedroom.id}번 침실</BedRoomTitle>
        <BedCounts>침대 {totalBedsCount}개</BedCounts>
        <BedsText>{bedsText}</BedsText>
        {isAdd &&
          bedroom.beds.map((bed, index) => (
            <CounterContainer key={index}>
              <Counter
                label={bed.type}
                onClick={(value) => handleClick(value, bedroom.id, bed.type)}
                value={bed.count}
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

export default BedTypes;
