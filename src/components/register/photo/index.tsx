import React from "react";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { useSelector } from "src/store";
import Button from "src/components/common/Button";
import styled from "styled-components";
import palette from "src/styles/palette";
import { uploadFileAPI } from "src/lib/api/files";
import { registerRoomActions } from "src/store/registerRoom";
import useSnackBar from "src/hooks/useSnackBar";
import RegisterRoomFooter from "../RegisterRoomFooter";
import UploadIcon from "../../../../public/static/svg/register/upload.svg";
import PhotoCardList from "./PhotoCardList";

const RegisterRoomBody = styled.div``;

const UploadContainer = styled.div`
  width: 858px;
  height: 433px;
  border: 2px dashed ${palette.gray_bb};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  border-radius: 6px;
  input {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  img {
    width: 100%;
    max-height: 100%;
  }
`;

const RegisterPhoto = () => {
  const { photos } = useSelector((state) => state.registerRoom);
  const dispatch = useDispatch();

  const { toggleShow, SnackBar } = useSnackBar();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        toggleShow(true, "info", "사진을 업로드 중입니다.");
        const { data } = await uploadFileAPI(formdata);
        dispatch(registerRoomActions.setPhotos([...photos, data]));
        toggleShow(false);
      } catch (error) {
        toggleShow(true, "error", "오류가 발생했습니다.");
        setTimeout(() => {
          toggleShow(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <RegisterRoomBody>
        <h2>숙소 사진 올리기</h2>
        <h3>7단계</h3>
        <p>
          게스트가 사진을 보고 숙소의 느낌을 생생히 떠올려볼 수 있도록 해주세요.
        </p>
        {/* lodash API 중 하나로 빈 배열이면 true 반환 */}
        {isEmpty(photos) && (
          <UploadContainer>
            <>
              <input type="file" accept="image/*" onChange={handleChange} />
              <Button icon={<UploadIcon />} style={{ width: 167 }}>
                사진 업로드
              </Button>
            </>
          </UploadContainer>
        )}
        {!isEmpty(photos) && <PhotoCardList photos={photos} />}
      </RegisterRoomBody>
      <RegisterRoomFooter
        isValid={true}
        nextHref="/room/register/description"
        snackBar={true}
        snackBarMessage="최소 1장 이상의 사진이 필요합니다."
      />
      <SnackBar />
    </>
  );
};

export default RegisterPhoto;
