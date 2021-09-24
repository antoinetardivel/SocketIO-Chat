import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import OneMessage from "../../components/Message/Message.component";
import { IMessage } from "../../types/messages";
import styles from "./MessagesList.module.scss";
import { SocketContext } from "../../providers/socket/SocketContext";
import { serializeMessage, serializeMessages } from "../../utils/Serialize";
import { Scrollbar } from "react-scrollbars-custom";
import { IidPhoto, TUserId } from "../../types/user";
import { avatars } from "../AvatarSelector/AvatarSelector.config";

interface IMessageList {}

const MessageList: React.FC<IMessageList> = () => {
  const { socket, connected, setIdPhotos } = useContext(SocketContext);
  const [allMessages, setMessages] = useState<IMessage[]>([]);
  const [userIds, setUserIds] = useState<TUserId[]>([]);
  const [userData, setUserData] = useState<IidPhoto[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const messagesListener = (messages: IMessage[]) => {
    setMessages(serializeMessages(messages));
  };
  const messageListener = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, serializeMessage(message)]);
  };

  useEffect(() => {
    socket?.on("messages", messagesListener);
    socket?.on("message", messageListener);
    socket?.emit("getMessages");
    return () => {
      socket?.off("messages", messagesListener);
      socket?.off("message", messageListener);
    };
  }, [socket]);

  const messageContainer = useRef(null);
  useEffect(() => {
    allMessages.map((message) =>
      setUserIds((prevUserIds) => {
        if (userIds.includes(message.user.id)) {
          return userIds;
        } else {
          return [...prevUserIds, message.user.id];
        }
      })
    );
    userIds.map((id) =>
      setUserData((prevUserData) => {
        const userDataTemp = [
          ...prevUserData,
          {
            userId: id,
            profilePhoto:
              Math.floor(Math.random() * (avatars.length - 1 - 0 + 1)) + 0,
          },
        ];
        return userDataTemp;
      })
    );

    if (messageContainer != null) {
      //@ts-ignore
      messageContainer.current.scrollTop =
        //@ts-ignore
        messageContainer.current.scrollHeight;
    }
  }, [messageContainer, allMessages, userIds, setIdPhotos]);
  useLayoutEffect(() => {
    setLoaded(true);
    setIdPhotos(userData);
  }, [setIdPhotos, userData]);
  return (
    <Scrollbar className={styles.messageListCont} ref={messageContainer}>
      {connected ? (
        <>
          {loaded &&
            allMessages.map((message, index) => {
              let previousIndex = 0;
              if (index > 0) {
                previousIndex = index - 1;
              }
              return (
                <div
                  key={index}
                  className={[
                    styles.messageCol,
                    message.user.id === socket?.id ? styles.myMessage : null,
                  ].join(" ")}
                >
                  {message.time - allMessages[previousIndex].time > 60000 && (
                    <span className={styles.messageTime}>
                      {new Date(message.time).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                  {(message.time - allMessages[previousIndex].time > 60000 ||
                    allMessages[previousIndex].user.id !== message.user.id) && (
                    <span className={styles.messageUsername}>
                      {message.user.name}
                    </span>
                  )}
                  <OneMessage
                    message={{
                      ...message,
                      value:
                        message.value.indexOf("�") !== -1 ||
                        message.value.indexOf("//uUx") !== -1 ||
                        message.value.length > 640
                          ? "Message type not supported."
                          : message.value,
                    }}
                    previousMessage={allMessages[previousIndex]}
                    userData={userData}
                  />
                </div>
              );
            })}
        </>
      ) : (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>
            <div className={styles.load}></div>
            <div className={styles.load}></div>
            <div className={styles.load}></div>
          </div>
        </div>
      )}
    </Scrollbar>
  );
};

export default MessageList;
