import Link from "next/link";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutAPI } from "~/lib/api/auth";
import { userActions } from "~/store/user";
import palette from "~/styles/palette";
import HamburgerIcon from "~/public/static/svg/header/hamburger.svg";
import { useSelector } from "~/store";

const ProfileButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  padding: 0px 6px 0px 16px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 8px;
`;

const UserMenu = styled.ul`
  position: absolute;
  right: 0;
  top: 52px;
  width: 200px;
  padding: 8px 0px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: white;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0px 16px;
    cursor: pointer;
    &:hover {
      background-color: ${palette.gray_f7};
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 8px 0px;
  background-color: ${palette.gray_dd};
`;

const HeaderUserProfile = () => {
  const dispatch = useDispatch();
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const { profileImage } = useSelector((state) => state.user);

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
      setIsUserMenuOpened(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpened) setIsUserMenuOpened(false);
      }}
    >
      <ProfileButtonContainer
        onClick={() => setIsUserMenuOpened(!isUserMenuOpened)}
      >
        <HamburgerIcon />
        <Img src={profileImage} />
      </ProfileButtonContainer>
      {isUserMenuOpened && (
        <UserMenu>
          <li>숙소 관리</li>
          <Link href="/room/register/building">
            <a role="presentation" onClick={() => setIsUserMenuOpened(false)}>
              <li>숙소 등록하기</li>
            </a>
          </Link>
          <Divider />
          <li role="presentation" onClick={logout}>
            로그아웃
          </li>
        </UserMenu>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
