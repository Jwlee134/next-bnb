import { isEmpty } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import Data from "src/lib/data";
import { StoredRoomType } from "src/types/room";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit,
      page = "1",
    } = req.query;
    try {
      const roomList = Data.room.getRoomList();

      const filteredRoomList = roomList.filter((room) => {
        // 위도 경도가 등록된 방 기준 ± 0.5 이내에 들지 않으면 필터링
        if (latitude && longitude) {
          if (
            !(
              Number(latitude) < room.latitude + 0.5 &&
              Number(latitude) > room.latitude - 0.5 &&
              Number(longitude) < room.longitude + 0.5 &&
              Number(longitude) > room.longitude - 0.5
            )
          ) {
            return false;
          }
        }
        // 체크인 날짜가 예약 가능 날짜 전이거나 예약 마감 날짜 후면 필터링
        if (checkInDate && room.startDate && room.endDate) {
          if (
            new Date(checkInDate as string) < new Date(room.startDate) ||
            new Date(checkInDate as string) > new Date(room.endDate)
          ) {
            return false;
          }
        }
        // 체크아웃 날짜가 예약 가능 날짜 전이거나 예약 마감 날짜 후면 필터링
        if (checkOutDate && room.startDate && room.endDate) {
          if (
            new Date(checkOutDate as string) < new Date(room.startDate) ||
            new Date(checkOutDate as string) > new Date(room.endDate)
          ) {
            return false;
          }
        }
        // 예약 인원이 등록된 방의 가능 예약 인원보다 높으면 필터링 (어린이는 0.5명으로 취급)
        if (
          room.maximumGuestCount <
          Number(adultCount as string) +
            (Number(childrenCount as string) * 0.5 || 0)
        ) {
          return false;
        }
        return true;
      });

      /* splice의 첫번째 인자 = 변경을 시작할 인덱스, 두번째 인자 = 배열에서 제거할 요소의 개수
      page = 1, limit = 20이면 roomsList에서 0부터 시작해서 20개의 요소를 제거(index 0 ~ 19),
      제거한 요소의 배열은 limitedRoomList에 담긴다. */
      const limitedRoomList = filteredRoomList.splice(
        (Number(page) - 1) * Number(limit),
        Number(limit)
      );
      /* 아래의 코드는 위 코드와 같음, slice의 첫번째 인자 = 추출을 시작할 인덱스, 두번째 인자 = 추출을 종료할 인덱스
      slice는 원본 배열을 변경하지 않고 새로운 배열을 반환
      const limitedRoomList = roomList.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
      ); */

      /* host 정보 넣기
      Promise.all은 비동기 작업을 병렬적으로 실행시켜주는 함수 https://ko.javascript.info/promise-api
      아래 함수의 실행 시간이 방의 개수에 따라 오래 걸릴수도 있으므로 비동기 처리로 구성
      Promise.all의 배열의 요소들은 프로미스이어야 하므로 map의 콜백 함수에 async를 붙여 프로미스를 반환하게 한다. */
      const roomListWithHost = await Promise.all(
        limitedRoomList.map(async (room) => {
          const host = Data.user.find({ id: room.hostId });
          return { ...room, host };
        })
      );

      res.status(200).send(roomListWithHost);
    } catch (error) {
      res.status(500).send("오류가 발생했습니다.");
    }
  }

  if (req.method === "POST") {
    try {
      const roomList = Data.room.getRoomList();
      if (isEmpty(roomList)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.status(201).end();
        return;
      }
      const newRoom: StoredRoomType = {
        id: roomList[roomList.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.room.write([...roomList, newRoom]);
      res.status(201).end();
    } catch (error) {
      console.log(error);
      res.status(500).send("오류가 발생했습니다.");
    }
  }

  res.status(405).end();
};
