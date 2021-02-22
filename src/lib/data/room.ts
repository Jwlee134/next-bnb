import fs, { writeFileSync } from "fs";
import { StoredRoomType } from "src/types/room";

const getRoomList = () => {
  const data = fs.readFileSync("data/room.json", "utf-8");
  if (!data) return [];
  const roomList: StoredRoomType[] = JSON.parse(data);
  return roomList;
};

const exist = (id: number) => {
  const data = getRoomList();
  return data.some((room) => room.id === id);
};

const find = (id: number) => {
  const data = getRoomList();
  return data.find((room) => room.id === id);
};

const write = (roomList: StoredRoomType[]) => {
  writeFileSync("data/room.json", JSON.stringify(roomList));
};

export default { getRoomList, exist, find, write };
