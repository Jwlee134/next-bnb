import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import RegisterRoomFooter from "../RegisterRoomFooter";
import NavigationIcon from "~/public/static/svg/register/navigation.svg";
import Button from "~/components/common/Button";
import palette from "~/styles/palette";

const RegisterRoomBody = styled.div``;

const RegisterGeometry = () => {
  const dispatch = useDispatch();

  return (
    <>
      <RegisterRoomBody>
        <h2>핀이 놓인 위치가 정확한가요?</h2>
        <h3>4단계</h3>
        <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
        <Button
          icon={<NavigationIcon />}
          styleType="register"
          style={{ border: `2px solid ${palette.dark_cyan}`, marginBottom: 24 }}
        >
          현재 위치 사용
        </Button>
      </RegisterRoomBody>
      <RegisterRoomFooter isValid={false} nextHref="/room/register/location" />
    </>
  );
};

export default RegisterGeometry;
