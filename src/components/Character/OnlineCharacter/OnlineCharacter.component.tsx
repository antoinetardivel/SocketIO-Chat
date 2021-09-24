import { useContext, useEffect, useState } from "react";
import { avatars } from "../../../layouts/AvatarSelector/AvatarSelector.config";
import { SocketContext } from "../../../providers/socket/SocketContext";
import { TUserId, TUserName } from "../../../types/user";
import Styles from "./OnlineCharacter.module.scss";

interface IOnlineCharacter {
  id: TUserId;
  name: TUserName;
  last: boolean;
}

const OnlineCharacter: React.FC<IOnlineCharacter> = ({ id, name, last }) => {
  const { idPhotos } = useContext(SocketContext);
  const [profilePhoto, setProfilePhoto] = useState("");
  useEffect(() => {
    for (let i = 0; i < idPhotos.length; i++) {
      if (idPhotos[i].userId === id) {
        setProfilePhoto(avatars[idPhotos[i].profilePhoto]);
      }
    }
  }, [idPhotos, id]);
  return (
    <div className={Styles.onlineUserContainer}>
      <div className={Styles.onlineUserRow}>
        <div className={Styles.onlineUserLine}></div>
        <div className={Styles.onlineUserBall}></div>
        <img
          className={Styles.onlineUserImage}
          src={
            profilePhoto
              ? profilePhoto
              : avatars[
                  Math.floor(Math.random() * (avatars.length - 1 - 0 + 1)) + 0
                ]
          }
          alt="Avatar"
        />
        <p className={Styles.onlineUserName}>{name}</p>
      </div>
      {last && <div className={Styles.onlineSquare}></div>}
    </div>
  );
};

export default OnlineCharacter;
