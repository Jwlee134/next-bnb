import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

import palette from "src/styles/palette";
import RegisterBathroom from "./bathroom";
import RegisterBedrooms from "./bedroom";
import RegisterBuilding from "./building";
import RegisterLocation from "./location";
import RegisterAmentities from "./amentities";
import RegisterConveniences from "./conveniences";
import RegisterPhoto from "./photo";
import RegisterDescription from "./description";
import RegisterTitle from "./title";
import RegisterPrice from "./price";
import RegisterDate from "./date";
import RegisterChecklist from "./checklist";

// window 객체를 사용할 컴포넌트이므로 서버 사이드 렌더링 방지
const RegisterGeometry = dynamic(import("./geometry"), { ssr: false });
// 이렇게 하거나 window 객체를 사용할함수를 useEffect 내에 넣어도 됨

const Container = styled.div`
  padding: 62px 30px 0px 30px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: 500;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  p {
    font-weight: 400;
    color: ${palette.gray_76};
    margin-bottom: 24px;
    max-width: 500px;
    line-height: 1.2;
  }
`;

const RegisterRoom = () => {
  const { pathname } = useRouter();
  const name = pathname.split("/").slice(-1)[0];

  return (
    <Container>
      {name === "building" && <RegisterBuilding />}
      {name === "bedrooms" && <RegisterBedrooms />}
      {name === "bathroom" && <RegisterBathroom />}
      {name === "location" && <RegisterLocation />}
      {name === "geometry" && <RegisterGeometry />}
      {name === "amentities" && <RegisterAmentities />}
      {name === "conveniences" && <RegisterConveniences />}
      {name === "photo" && <RegisterPhoto />}
      {name === "description" && <RegisterDescription />}
      {name === "title" && <RegisterTitle />}
      {name === "price" && <RegisterPrice />}
      {name === "date" && <RegisterDate />}
      {name === "checklist" && <RegisterChecklist />}
    </Container>
  );
};

export default RegisterRoom;
