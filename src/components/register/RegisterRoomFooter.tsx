import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import useValidateMode from "src/hooks/useValidateMode";
import useSnackBar from "src/hooks/useSnackBar";
import palette from "src/styles/palette";
import Button from "../common/Button";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";

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
      return;
    }
    router.push(nextHref);
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
      <Button
        style={{ backgroundColor: palette.dark_cyan, width: submit ? 102 : 62 }}
        onClick={handleClick}
      >
        {submit ? "등록하기" : "계속"}
      </Button>
      <SnackBar />
    </Container>
  );
};

export default RegisterRoomFooter;
