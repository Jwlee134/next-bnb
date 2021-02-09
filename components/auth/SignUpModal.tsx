import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import Input from "../common/Input";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "~/lib/staticData";
import palette from "~/styles/palette";

const Container = styled.form`
  width: 468px;
  height: 514px;
  margin-top: 80px;
  padding: 32px;
  background-color: white;
  border-radius: 15px;
`;

const StyleAiOutlineClose = styled(AiOutlineClose)`
  opacity: 0.5;
  cursor: pointer;
  display: block;
  margin: 0 0 20px auto;
`;

const Birthday = styled.p`
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const BirthdayInfo = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: ${palette.charcoal};
  line-height: 1.1;
`;

const SelectorContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const Day = styled.div`
  flex-grow: 1;
  margin-right: 16px;
`;

const Month = styled.div`
  width: 25%;
  margin-right: 16px;
`;
const Year = styled.div`
  width: 33.3333%;
`;

interface Props {
  closeModal: () => void;
}

const SignUpModal = ({ closeModal }: Props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [birthMonth, setBirthMonth] = useState("");

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
  // 년
  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };
  // 일
  const handleDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthday(e.target.value);
  };
  // 월
  const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
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
      <Birthday>생일</Birthday>
      <BirthdayInfo>
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </BirthdayInfo>
      <SelectorContainer>
        <Day>
          <Selector
            options={monthList}
            defaultValue="월"
            onChange={handleMonth}
          />
        </Day>
        <Month>
          <Selector options={dayList} defaultValue="일" onChange={handleDay} />
        </Month>
        <Year>
          <Selector
            options={yearList}
            defaultValue="년"
            onChange={handleYear}
          />
        </Year>
      </SelectorContainer>
    </Container>
  );
};

export default SignUpModal;
