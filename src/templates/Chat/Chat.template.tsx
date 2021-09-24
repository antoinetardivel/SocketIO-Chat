import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import Input from "../../components/Input/Input.component";
import LineSeparator from "../../components/Separators/LineSeparator/LineSeparator.component";
import EmotionList from "../../layouts/EmotionList/EmotionList.layout";
import Header from "../../layouts/Header/Header.layout";
import MessageList from "../../layouts/MessageList/MessagesList.layout";
import { SocketContext } from "../../providers/socket/SocketContext";
import { TMessageType } from "../../types/messages";
import Online from "../Online/Online.template";
import Styles from "./Chat.module.scss";
import logo from "../../assets/logo.svg";
import env from "react-dotenv";

interface IChat {}

const Chat: React.FC<IChat> = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { setSocket, setConnected, username, connected } =
    useContext(SocketContext);
  const [messageType, setMessageType] = useState<TMessageType>("normal");

  const HandleMessageType = (type: TMessageType) => {
    setMessageType(type);
  };
  const location = useHistory();
  const { socket } = useContext(SocketContext);
  const servUrl: string = env.SERVER_URL;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    if (username === "") {
      location.push("/");
    } else {
      if (!socket) {
        console.log(servUrl);
        const newSocket = io(servUrl);

        setSocket(newSocket);
        newSocket.on("connect", () => {
          setConnected(true);
          newSocket.emit("setUsername", username);
        });
      }
    }
  }, [setSocket, setConnected, connected, location, username, socket, servUrl]);

  return (
    <div className={Styles.allChat}>
      <Online width={windowWidth} />
      <div className={Styles.ChatContainer}>
        <div className={Styles.chatHeader}>
          <Header
            type={windowWidth <= 800 ? "online" : "chatRight"}
            image={logo}
          />
          <LineSeparator />
        </div>
        <MessageList />
        <div className={Styles.messageCreation}>
          <div className={Styles.fadeSeparator}></div>
          <EmotionList changeType={HandleMessageType} />
          <Input
            placeholder={"Type here..."}
            maxChar={640}
            messageType={messageType}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
