import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import Input from "../common/Input";
import { authActions } from "~/store/auth";
import Button from "../common/Button";
import palette from "~/styles/palette";
import useValidateMode from "~/hooks/useValidateMode";
import { loginAPI } from "~/lib/api/auth";
import { userActions } from "~/store/user";

const Header = styled.div`
  height: 50px;
  position: relative;
`;

const HeaderTitle = styled.p`
  text-align: center;
`;

const StyleAiOutlineClose = styled(AiOutlineClose)`
  opacity: 0.5;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const FormContainer = styled.form``;

const ButtonContainer = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

const LoginText = styled.span`
  color: ${palette.dark_cyan};
  margin-left: 8px;
  cursor: pointer;
`;

interface Props {
  closeModal: () => void;
}

const LoginModal = ({ closeModal }: Props) => {
  const dispatch = useDispatch();

  const { setValidateMode } = useValidateMode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateMode(true);
    try {
      if (!email || !password) return;
      const body = { email, password };
      const { data } = await loginAPI(body);
      dispatch(userActions.setLoggedUser(data));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <>
      <Header>
        <HeaderTitle>로그인</HeaderTitle>
        <StyleAiOutlineClose size={20} onClick={closeModal} />
      </Header>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          placeholder="이메일"
          type="email"
          name="email"
          icon={<HiOutlineMail size={20} />}
          style={{ marginBottom: 16 }}
          onChange={handleEmail}
          value={email}
          errorMessage="이메일을 입력하세요."
          useValidation={true}
          isValid={!!email} //빈 문자열이면 false, 아니면 true 반환
        />
        <Input
          placeholder="비밀번호"
          type="password"
          style={{ marginBottom: 16 }}
          onChange={handlePassword}
          value={password}
          errorMessage="비밀번호를 입력하세요."
          useValidation={true}
          isValid={!!password}
        />
        <ButtonContainer>
          <Button type="submit">로그인</Button>
        </ButtonContainer>
        <p>
          계정이 없으신가요?{" "}
          <LoginText
            role="presentation"
            onClick={() => dispatch(authActions.setAuthMode("signUp"))}
          >
            회원가입
          </LoginText>
        </p>
      </FormContainer>
    </>
  );
};

export default LoginModal;
