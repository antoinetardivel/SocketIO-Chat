import { IUser } from "./user";

export interface IMessage {
  id: string;
  user: IUser;
  value: string;
  time: number;
}

export type TMessageType =
  | "normal"
  | "love"
  | "agree"
  | "disagree"
  | "clap"
  | "sad"
  | "scare"
  | "angry"
  | "exclamation"
  | "question";
