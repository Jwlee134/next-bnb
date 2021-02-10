import { readFileSync, writeFileSync } from "fs";
import { StoredUser } from "~/types/user";

const getUserList = () => {
  const userData = readFileSync("data/user.json", "utf-8");
  if (!userData) {
    return [];
  }
  const users: StoredUser[] = JSON.parse(userData);
  return users;
};

const exist = (email: string) => {
  const userData = getUserList();
  return userData.some((user) => user.email === email);
};

const saveUser = (user: StoredUser[]) => {
  writeFileSync("data/user.json", JSON.stringify(user));
};

export default { getUserList, exist, saveUser };
