export interface StoredUser extends User {
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  profileImage: string;
}
