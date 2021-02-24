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
      infantsCount,
      latitude,
      longitude,
      limit,
      page = "1",
    } = req.query;
    try {
      const roomsList = Data.room.getRoomList();

      // splice의 첫번째 인자 = 변경을 시작할 인덱스, 두번째 인자 = 배열에서 제거할 요소의 개수
      // page = 1, limit = 20이면 roomsList에서 0부터 시작해서 20개의 요소를 제거(index 0 ~ 19),
      // 제거한 요소의 배열은 limitedRoomList에 담긴다.
      const limitedRoomList = roomsList.splice(
        (Number(page) - 1) * Number(limit),
        Number(limit)
      );
      // 아래의 코드는 위 코드와 같음, slice의 첫번째 인자 = 추출을 시작할 인덱스, 두번째 인자 = 추출을 종료할 인덱스
      // slice는 원본 배열을 변경하지 않고 새로운 배열을 반환
      /* const limitedRoomList = roomsList.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
      ); */

      // host 정보 넣기
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
