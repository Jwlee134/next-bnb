import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import Input from "../common/Input";

const Container = styled.form`
  width: 468px;
  height: 514px;
  margin-top: 80px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  border-radius: 15px;
`;

const StyleAiOutlineClose = styled(AiOutlineClose)`
  opacity: 0.5;
  cursor: pointer;
  display: block;
  margin: 0 0 20px auto;
`;

interface Props {
  closeModal: () => void;
}

const SignUpModal = ({ closeModal }: Props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  // 이메일
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // 이름
  const handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };
  // 성
  const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };
  // 비밀번호
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <StyleAiOutlineClose size={20} onClick={closeModal} />
      <Input
        placeholder="이메일 주소"
        type="email"
        name="email"
        icon={<HiOutlineMail size={20} />}
        style={{ marginBottom: 16 }}
        onChange={handleEmail}
        value={email}
      />
      <Input
        placeholder="이름"
        icon={<HiOutlineUser size={20} />}
        style={{ marginBottom: 16 }}
        onChange={handleFirstname}
        value={firstname}
      />
      <Input
        placeholder="성"
        icon={<HiOutlineUser size={20} />}
        style={{ marginBottom: 16 }}
        onChange={handleLastname}
        value={lastname}
      />
      <Input
        placeholder="비밀번호"
        type="password"
        style={{ marginBottom: 16 }}
        onChange={handlePassword}
        value={password}
      />
    </Container>
  );
};

export default SignUpModal;
