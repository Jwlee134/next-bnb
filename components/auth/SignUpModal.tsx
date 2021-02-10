import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import Selector from "../common/Selector";
import Input from "../common/Input";
import palette from "~/styles/palette";
import { userActions } from "~/store/user";
import { dayList, monthList, yearList } from "~/lib/staticData";
import Button from "../common/Button";
import { signUpAPI } from "~/lib/api/auth";
import useValidateMode from "~/hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";

const Header = styled.div`
  height: 50px;
  position: relative;
`;

const HeaderTitle = styled.p`
  text-align: center;
`;

const FormContainer = styled.form`
  height: 464px;
  overflow: auto;
  padding-right: 32px;
`;

const StyleAiOutlineClose = styled(AiOutlineClose)`
  opacity: 0.5;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const Birthday = styled.p`
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: 500;
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

const ButtonContainer = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray_eb};
`;

interface Props {
  closeModal: () => void;
}

const SignUpModal = ({ closeModal }: Props) => {
  const dispatch = useDispatch();

  const minPasswordLength = useRef(8);

  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleFocus = () => {
    setPasswordFocused(true);
  };

  const { setValidateMode } = useValidateMode();

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [birthMonth, setBirthMonth] = useState("");

  // Password가 최소 자릿수 이상이면 true를 리턴
  const overMinLength = useMemo(
    () => password.length >= minPasswordLength.current,
    [password]
  );
  // Password가 특수문자와 숫자를 포함하면 true를 리턴
  const hasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) &&
      /[0-9]/g.test(password),
    [password]
  );

  // Validation
  const validateSignUpForm = () => {
    if (
      !email ||
      !firstname ||
      !lastname ||
      !password ||
      !birthDay ||
      !birthMonth ||
      !birthYear
    ) {
      return false;
    }
    if (!overMinLength || !hasNumberOrSymbol) {
      return false;
    }
    return true;
  };

  // Form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateMode(true);
    if (validateSignUpForm()) {
      try {
        const body = {
          email,
          firstname,
          lastname,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
          ).toISOString(),
        };
        const { data } = await signUpAPI(body);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <>
      <Header>
        <HeaderTitle>회원가입</HeaderTitle>
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
          placeholder="이름"
          icon={<HiOutlineUser size={20} />}
          style={{ marginBottom: 16 }}
          onChange={handleFirstname}
          value={firstname}
          errorMessage="이름을 입력하세요."
          useValidation={true}
          isValid={!!firstname} // 빈 문자열이면 false, 아니면 true 반환
        />
        <Input
          placeholder="성"
          icon={<HiOutlineUser size={20} />}
          style={{ marginBottom: 16 }}
          onChange={handleLastname}
          value={lastname}
          errorMessage="성을 입력하세요."
          useValidation={true}
          isValid={!!lastname} // 빈 문자열이면 false, 아니면 true 반환
        />
        <Input
          placeholder="비밀번호"
          type="password"
          style={{ marginBottom: 16 }}
          onChange={handlePassword}
          value={password}
          errorMessage="비밀번호를 입력하세요."
          useValidation={true}
          isValid={overMinLength && hasNumberOrSymbol}
          onFocus={handleFocus}
        />
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={overMinLength}
              text="최소 8자 이상이어야 합니다."
            />
            <PasswordWarning
              isValid={hasNumberOrSymbol}
              text="숫자와 기호를 포함하세요."
            />
          </>
        )}
        <Birthday>생년월일</Birthday>
        <BirthdayInfo>
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생년월일은 다른
          에어비앤비 사용자에게 공개되지 않습니다.
        </BirthdayInfo>
        <SelectorContainer>
          <Day>
            <Selector
              options={monthList}
              defaultValue="월"
              onChange={handleMonth}
              isValid={!!birthMonth}
            />
          </Day>
          <Month>
            <Selector
              options={dayList}
              defaultValue="일"
              onChange={handleDay}
              isValid={!!birthDay}
            />
          </Month>
          <Year>
            <Selector
              options={yearList}
              defaultValue="년"
              onChange={handleYear}
              isValid={!!birthYear}
            />
          </Year>
        </SelectorContainer>
        <ButtonContainer>
          <Button type="submit">가입하기</Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default SignUpModal;
