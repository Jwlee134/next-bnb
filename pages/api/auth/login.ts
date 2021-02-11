import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Data from "~/lib/data";
import { StoredUser } from "~/types/user";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        body: { email, password },
      } = req;

      const user = Data.user.find({ email });
      if (!user) {
        res.status(404).send("가입되지 않은 이메일입니다.");
        return;
      }

      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (!isPasswordMatched) {
        res.status(403).send("비밀번호가 일치하지 않습니다.");
        return;
      }

      const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);
      const expires = new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 // 3일
      ).toUTCString();

      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; path=/; expires=${expires}; httponly`
      );

      const userWithoutPassword: Partial<Pick<StoredUser, "password">> = user;
      delete userWithoutPassword.password;

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  res.status(405).end();
};
