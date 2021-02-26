import { NextApiRequest, NextApiResponse } from "next";
import Data from "src/lib/data";
import { StoredUser } from "src/types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const room = Data.room.find(Number(id));
      if (room) {
        const host = Data.user.find({ id: room.hostId });
        if (host) {
          const userWithoutPassword: Partial<
            Pick<StoredUser, "password">
          > = host;
          delete userWithoutPassword.password;
          const roomWithHost = { ...room, host: userWithoutPassword };
          res.status(200).send(roomWithHost);
        }
      }
    } catch (error) {
      res.status(404).send("존재하지 않는 숙소입니다.");
    }
  }
  res.status(405).end();
};
