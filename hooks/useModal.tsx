import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css, keyframes } from "styled-components";

const show = keyframes`
  0% {
    transform: translateY(500px);
  }
  70% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const fade = keyframes`
  0% {
    background-color: rgba(255, 255, 255, 1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div<{ opening: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  ${({ opening }) =>
    opening &&
    css`
      animation: ${fade} 0.3s linear forwards;
    `}
`;

const Children = styled.div<{ opening: boolean }>`
  z-index: 11;
  ${({ opening }) =>
    opening &&
    css`
      animation: ${show} 0.5s ease-in-out;
    `}
`;

interface Props {
  children: React.ReactNode;
}

const useModal = () => {
  const ref = useRef<Element | null>();
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  // 모달을 띄운 상태에서 새로고침을 해버리면 서버 사이드 렌더링이 진행된다.
  // 서버에선 document나 window가 존재하지 않는다.
  // dom으로 접근하는 modal이 띄워져 있는 상태이므로 document가 존재하지 않아 에러가 발생한다.
  // 따라서 useEffect를 사용하여 컴포넌트가 렌더링 되면 document에 접근이 가능하도록 설정한다.

  useEffect(() => {
    if (document) {
      const dom = document.querySelector("#portal");
      ref.current = dom;
    }
  }, []);

  const ModalPortal = ({ children }: Props) => {
    if (ref.current && modalOpened) {
      return ReactDOM.createPortal(
        <Container>
          <ModalBackground opening={modalOpened} onClick={closeModal} />
          <Children opening={modalOpened}>{children}</Children>
        </Container>,
        ref.current
      );
    }
    return null;
  };

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
