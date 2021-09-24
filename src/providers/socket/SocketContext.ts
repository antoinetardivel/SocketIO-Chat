import { createContext } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { IidPhoto } from "../../types/user";

export interface ISocketContext {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocket: React.Dispatch<
    React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>
  >;
  connected: boolean;
  setConnected: React.Dispatch<boolean>;
  username: string;
  setUsername: React.Dispatch<string>;
  profilePhoto: null | number;
  setProfilePhoto: React.Dispatch<null | number>;
  idPhotos: IidPhoto[];
  setIdPhotos: React.Dispatch<[] | IidPhoto[]>;
  deployed: boolean;
  setDeployed: React.Dispatch<boolean>;
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  setSocket: () => {},
  connected: false,
  setConnected: () => {},
  username: "",
  setUsername: () => {},
  profilePhoto: null,
  setProfilePhoto: () => {},
  idPhotos: [],
  setIdPhotos: () => {},
  deployed: false,
  setDeployed: () => {},
});
