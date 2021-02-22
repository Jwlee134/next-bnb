import { isEmpty } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import Data from "src/lib/data";
import { StoredRoomType } from "src/types/room";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
      res.status(500).send(error.response.data);
    }
  }
  res.status(405).end();
};
