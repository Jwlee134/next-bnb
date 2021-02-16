import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import palette from "~/styles/palette";

import RegisterBathroom from "./bathroom";
import RegisterBedrooms from "./bedroom";
import RegisterBuilding from "./building";
import RegisterLocation from "./location/Location";

// window 객체를 사용할 컴포넌트이므로 서버 사이드 렌더링 방지
const RegisterGeometry = dynamic(import("./location/Geometry"), { ssr: false });

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
    font-weight: 500;
    color: ${palette.gray_76};
    margin-bottom: 24px;
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
    </Container>
  );
};

export default RegisterRoom;
