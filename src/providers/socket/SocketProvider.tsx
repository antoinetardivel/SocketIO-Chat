import { useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { IidPhoto } from "../../types/user";
import { SocketContext } from "./SocketContext";

export interface ISocketProvider {}

const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<null | number>(null);
  const [idPhotos, setIdPhotos] = useState<IidPhoto[]>([]);
  const [deployed, setDeployed] = useState<boolean>(false);
  const value = {
    socket,
    setSocket,
    connected,
    setConnected,
    username,
    setUsername,
    profilePhoto,
    setProfilePhoto,
    idPhotos,
    setIdPhotos,
    deployed,
    setDeployed,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
