import React from "react";
import { useSelector } from "~/store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

interface Props {
  closeModal: () => void;
}

const AuthModal = ({ closeModal }: Props) => {
  const { authMode } = useSelector((state) => state.auth);
  return (
    <>
      {authMode === "signUp" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </>
  );
};

export default AuthModal;
