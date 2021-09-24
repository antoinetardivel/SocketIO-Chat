import { useContext, useEffect, useState } from "react";
import { avatars } from "../../layouts/AvatarSelector/AvatarSelector.config";
import { emotions } from "../../layouts/EmotionList/EmotionList.config";
import { SocketContext } from "../../providers/socket/SocketContext";
import { IEmotion } from "../../types/emotions";
import { IMessage } from "../../types/messages";
import { TUserId } from "../../types/user";
import EmotionIcon from "../Emotion/EmotionIcon/EmotionIcon.component";
import Styles from "./Message.module.scss";

interface IOneMessage {
  message: IMessage;
  previousMessage: IMessage;
  userData: IuserData[];
}

interface IuserData {
  userId: TUserId;
  profilePhoto: number;
}

const OneMessage: React.FC<IOneMessage> = ({
  message: {
    time,
    user: { id },
    value,
  },
  previousMessage,
  userData,
}) => {
  const [imageIndex, setImageIndex] = useState(-1);
  const [messageValue, setMessageValue] = useState<string | null>(null);
  const [emotionValue, setEmotionValue] = useState<IEmotion | null>(null);

  useEffect(() => {
    setImageIndex(() => {
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].userId === id) {
          return userData[i].profilePhoto;
        }
      }
      return 0;
    });
    setEmotionValue(() => {
      for (let i = 0; i < emotions.length; i++) {
        if (value.indexOf(`[${emotions[i].type}]`) !== -1) {
          setMessageValue(value.substring(emotions[i].type.length + 2));
          return emotions[i];
        }
      }
      setMessageValue(value);
      return null;
    });
  }, [userData, setImageIndex, id, value]);

  const { socket, profilePhoto } = useContext(SocketContext);

  return (
    <>
      {imageIndex >= 0 && (
        <div
          className={[
            Styles.messageContainer,
            id === socket?.id ? Styles.contentAlignRight : null,
          ].join(" ")}
        >
          {(time - previousMessage.time > 60000 ||
            previousMessage.user.id !== id) && (
            <img
              className={Styles.messageImage}
              src={
                avatars[
                  id === socket?.id && profilePhoto ? profilePhoto : imageIndex
                ]
              }
              alt=""
            />
          )}
          <div
            className={Styles.messageContent}
            style={{
              marginLeft:
                time - previousMessage.time > 60000 ||
                previousMessage.user.id !== id
                  ? "15px"
                  : "50px",
              marginRight:
                (time - previousMessage.time > 60000 ||
                  previousMessage.user.id !== id) &&
                id === socket?.id
                  ? "15px"
                  : "50px",
            }}
          >
            {emotionValue && <EmotionIcon emotion={emotionValue} />}
            {messageValue}
          </div>
        </div>
      )}
    </>
  );
};

export default OneMessage;
