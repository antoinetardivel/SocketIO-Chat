export interface IUser {
  id: TUserId;
  name: TUserName;
}
export interface IidPhoto {
  userId: TUserId;
  profilePhoto: number;
}

export type TUserId = string;
export type TUserName = string;
