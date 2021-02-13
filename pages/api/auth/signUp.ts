import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Data from "~/lib/data";
import { StoredUser } from "~/types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body: { email, password, firstname, lastname, birthday },
    } = req;

    const userExists = Data.user.exist(email);

    if (userExists) {
      res.status(409).send("이미 가입된 이메일입니다.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const users = Data.user.getUserList();

    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    const newUser: StoredUser = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: "/static/image/user/default_user_profile_image.jpg",
    };

    Data.user.saveUser([...users, newUser]);

    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
    const expires = new Date(
      Date.now() + 60 * 60 * 24 * 1000 * 3 // 3일
    ).toUTCString();

    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${expires}; httponly`
    );

    // 특정 속성만 제거하는 방법
    // Partial : 인터페이스의 모든 프로퍼티를 optional하게 변경한다.
    // Pick : 인터페이스의 프로퍼티 중 일부만 받도록 설정한다.
    const newUserWithoutPassword: Partial<
      Pick<StoredUser, "password">
    > = newUser;
    delete newUserWithoutPassword.password;

    res.status(200).send(newUserWithoutPassword);
  }

  res.status(405).end();
};
