import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Counter from "src/components/common/Counter";
import Selector from "src/components/common/Selector";
import { bedroomCountList } from "src/lib/staticData";
import { getNumber } from "src/lib/utils";
import { useSelector } from "src/store";
import { registerRoomActions } from "src/store/registerRoom";
import palette from "src/styles/palette";
import RegisterRoomFooter from "../RegisterRoomFooter";
import BedTypeList from "./BedTypeList";

const RegisterRoomBody = styled.div``;

const CommonContainer = styled.div`
  width: 320px;
  margin-bottom: 32px;
`;

const Title = styled.div`
  color: ${palette.gray_76};
  font-weight: 500;
  margin-bottom: 8px;
`;

const BedTypetitle = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const BedTypeDescription = styled.div`
  width: 400px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 300;
`;

const RegisterBedrooms = () => {
  const { maximumGuestCount, bedroomCount, bedCount } = useSelector(
    (state) => state.registerRoom
  );
  const dispatch = useDispatch();

  const handleMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBedroomCount(getNumber(e.target.value)));
  };

  const handleBedCount = (value: number) => {
    dispatch(registerRoomActions.setBedCount(value));
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
        <h3>2단계</h3>
        <p>
          모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
          확인하세요.
        </p>
        <CommonContainer>
          <Counter
            label="최대 숙박 인원"
            value={maximumGuestCount}
            onClick={handleMaximumGuestCount}
          />
        </CommonContainer>
        <CommonContainer>
          <Selector
            label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
            options={bedroomCountList}
            onChange={handleChange}
            type="register"
            value={`침실 ${bedroomCount}개`}
            showErrorMessage={true}
            errorMessage="최소 1개 이상의 침실이 있어야 합니다."
          />
        </CommonContainer>
        <CommonContainer style={{ marginBottom: 45 }}>
          <Title>게스트가 사용할 수 있는 침대는 몇 개인가요?</Title>
          <Counter label="침대" value={bedCount} onClick={handleBedCount} />
        </CommonContainer>
        <BedTypetitle>침대 유형</BedTypetitle>
        <BedTypeDescription>
          각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어
          있는지 게스트가 잘 파악할 수 있습니다.
        </BedTypeDescription>
        <BedTypeList />
      </RegisterRoomBody>
      <RegisterRoomFooter
        isValid={!!bedroomCount}
        nextHref="/room/register/bathroom"
      />
    </>
  );
};

export default RegisterBedrooms;
