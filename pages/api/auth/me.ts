import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Data from "~/lib/data";
import { StoredUser } from "~/types/user";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (!accessToken) {
        res.status(400).send("토큰이 없습니다.");
        return;
      }

      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);

      const user = Data.user.find({ id: Number(userId) });
      if (!user) {
        res.status(404).send("해당 유저가 없습니다.");
        return;
      }

      const userWithoutPassword: Partial<Pick<StoredUser, "password">> = user;
      delete userWithoutPassword.password;

      res.status(200).send(userWithoutPassword);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  res.status(405).end();
};
