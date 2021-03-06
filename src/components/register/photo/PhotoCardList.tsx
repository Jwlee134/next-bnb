import React from "react";
import Image from "next/image";
import styled from "styled-components";
import palette from "src/styles/palette";

import { useDispatch } from "react-redux";
import { deleteFileAPI, uploadFileAPI } from "src/lib/api/files";
import { registerRoomActions } from "src/store/registerRoom";
import useSnackBar from "src/hooks/useSnackBar";

import PencilIcon from "../../../../public/static/svg/register/photo/pencil.svg";
import TrashCanIcon from "../../../../public/static/svg/register/photo/trash_can.svg";
import GrayPlusIcon from "../../../../public/static/svg/register/photo/gray_plus.svg";

const Container = styled.div`
  width: 858px;
`;

const ButtonContainer = styled.div`
  display: none;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const FirstPhoto = styled.div`
  width: 858px;
  height: 433px;
  position: relative;
  margin-bottom: 24px;
  &:hover {
    ${ButtonContainer} {
      display: inherit;
    }
  }
`;

const Rest = styled.div`
  float: left; // or display: inline-block;
  width: calc((100% - 48px) / 3);
  height: 180px;
  margin-right: 24px;
  margin-bottom: 24px;
  position: relative;
  &:hover {
    ${ButtonContainer} {
      display: inherit;
    }
  }
  &:nth-child(3n + 1) {
    margin-right: 0;
  }
`;

const Img = styled(Image)`
  border-radius: 6px;
`;

const Button = styled.button`
  border-radius: 50%;
  width: 38px;
  height: 38px;
  cursor: pointer;
  background-color: white;
  border: none;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
`;

const AddContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed ${palette.gray_bb};
  border-radius: 6px;
  cursor: pointer;
  svg {
    margin-bottom: 10px;
  }
`;

const PhotoCardList = ({ photos }: { photos: string[] }) => {
  const dispatch = useDispatch();

  const { toggleShow, SnackBar } = useSnackBar();

  const addPhoto = () => {
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";
    el.onchange = async (e) => {
      const { files } = e.target as HTMLInputElement;
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
    el.click();
  };

  const deletePhoto = async (index: number) => {
    const key = photos[index].split("/").pop();
    if (key) {
      try {
        await deleteFileAPI(key);
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        dispatch(registerRoomActions.setPhotos(newPhotos));
      } catch (error) {
        toggleShow(true, "error", "오류가 발생했습니다.");
        setTimeout(() => {
          toggleShow(false);
        }, 2000);
      }
    }
  };

  const editPhoto = (index: number) => {
    const key = photos[index].split("/").pop();
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";
    el.onchange = async (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file && key) {
        const formdata = new FormData();
        formdata.append("file", file);
        try {
          toggleShow(true, "info", "사진을 업로드 중입니다.");
          await deleteFileAPI(key);
          const { data } = await uploadFileAPI(formdata);
          const newPhotos = [...photos];
          newPhotos[index] = data;
          dispatch(registerRoomActions.setPhotos(newPhotos));
          toggleShow(false);
        } catch (error) {
          toggleShow(true, "error", "오류가 발생했습니다.");
          setTimeout(() => {
            toggleShow(false);
          }, 2000);
        }
      }
    };
    el.click();
  };

  return (
    <Container>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <FirstPhoto>
              <Img src={photo} layout="fill" objectFit="cover" />
              <ButtonContainer>
                <Button
                  type="button"
                  onClick={() => deletePhoto(index)}
                  style={{ marginRight: 8 }}
                >
                  <TrashCanIcon />
                </Button>
                <Button type="button" onClick={() => editPhoto(index)}>
                  <PencilIcon />
                </Button>
              </ButtonContainer>
            </FirstPhoto>
          )}
          {index !== 0 && (
            <Rest>
              <Img src={photo} layout="fill" objectFit="cover" />
              <ButtonContainer>
                <Button
                  type="button"
                  onClick={() => deletePhoto(index)}
                  style={{ marginRight: 8 }}
                >
                  <TrashCanIcon />
                </Button>
                <Button type="button" onClick={() => editPhoto(index)}>
                  <PencilIcon />
                </Button>
              </ButtonContainer>
            </Rest>
          )}
        </React.Fragment>
      ))}
      <Rest onClick={addPhoto}>
        <AddContainer>
          <GrayPlusIcon />
          <span>추가하기</span>
        </AddContainer>
      </Rest>
      <SnackBar />
    </Container>
  );
};

export default PhotoCardList;
