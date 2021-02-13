import React from "react";
import styled from "styled-components";
import { largeBuildingTypeList } from "~/lib/staticData";
import palette from "~/styles/palette";
import Selector from "../common/Selector";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

const BuildingSelector = styled.div`
  width: 320px;
  margin-bottom: 32px;
`;

const RegisterRoomBuilding = () => {
  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <Selector
        options={largeBuildingTypeList}
        label="우선 범위를 좁혀볼까요?"
        defaultValue="하나를 선택해주세요."
        style={{ width: 320, marginBottom: 32 }}
        isValid={false}
        useErrorMessage={true}
        type="register"
      />
    </Container>
  );
};

export default RegisterRoomBuilding;
