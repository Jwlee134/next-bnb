import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import useValidateMode from "src/hooks/useValidateMode";
import useSnackBar from "src/hooks/useSnackBar";
import palette from "src/styles/palette";
import { useSelector } from "src/store";
import { registerRoomAPI } from "src/lib/api/room";
import Button from "../common/Button";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "src/store/registerRoom";

const Container = styled.div`
  width: 100%;
  height: 82px;
  border-top: 1px solid ${palette.gray_dd};
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  padding: 14px 30px 20px;
  background-color: white;
`;

const BackButton = styled.a`
  display: flex;
  align-items: center;
  color: ${palette.dark_cyan};
  cursor: pointer;
  svg {
    margin-right: 8px;
  }
`;

interface Props {
  nextHref: string;
  isValid?: boolean;
  snackBar?: boolean;
  snackBarMessage?: string;
  submit?: boolean;
}

const RegisterRoomFooter = ({
  nextHref,
  isValid = false,
  snackBar = false,
  snackBarMessage,
  submit = false,
}: Props) => {
  const { setValidateMode } = useValidateMode();
  const { toggleShow, SnackBar } = useSnackBar();

  const dispatch = useDispatch();

  const { id: userId } = useSelector((state) => state.user);
  const registerRoom = useSelector((state) => state.registerRoom);

  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isValid) {
      e.preventDefault();
      setValidateMode(true);
      if (snackBar) {
        toggleShow(true, "error", snackBarMessage);
        setTimeout(() => {
          toggleShow(false);
        }, 2000);
      }
    }
  };

  const handleSubmit = async () => {
    const registerRoomBody = {
      ...registerRoom,
      hostId: userId,
    };
    try {
      await registerRoomAPI(registerRoomBody);
      dispatch(registerRoomActions.initData());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <BackButton onClick={() => router.back()}>
        <BackArrowIcon /> 뒤로
      </BackButton>
      {!submit && (
        <Link href={nextHref}>
          <a>
            <Button
              style={{ backgroundColor: palette.dark_cyan, width: 62 }}
              onClick={handleClick}
            >
              계속
            </Button>
          </a>
        </Link>
      )}
      {submit && (
        <Button
          style={{ backgroundColor: palette.dark_cyan, width: 102 }}
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      )}
      <SnackBar />
    </Container>
  );
};

export default RegisterRoomFooter;
