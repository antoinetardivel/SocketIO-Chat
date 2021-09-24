import { useContext, useEffect, useState } from "react";
import OnlineCharacter from "../../components/Character/OnlineCharacter/OnlineCharacter.component";
import Header from "../../layouts/Header/Header.layout";
import { SocketContext } from "../../providers/socket/SocketContext";
import { IUser } from "../../types/user";
import Styles from "./Online.module.scss";
import { Scrollbar } from "react-scrollbars-custom";

interface IOnline {
  width: number;
}

const Online: React.FC<IOnline> = ({ width }) => {
  const { socket, username, deployed } = useContext(SocketContext);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    socket?.on("userDisconnection", (user: any) =>
      setUsers((prevUsers) => {
        for (let i = 0; i < prevUsers.length; i++) {
          if (prevUsers[i].id === user.id) {
            return prevUsers.splice(i, 1);
          }
        }
        return prevUsers;
      })
    );
    socket?.on("userConnection", (user: any) =>
      setUsers((prevUsers) => {
        return [...prevUsers, user];
      })
    );
    socket?.on("updateUsername", (user: any) => {
      setUsers((prevUsers) => {
        let usersTemps = prevUsers;
        for (let i = 0; i < prevUsers.length; i++) {
          if (prevUsers[i].id === user.id) {
            usersTemps[i].name = user.name;
            return usersTemps;
          }
        }
        return prevUsers;
      });
    });
    socket?.on("users", (users: any) => setUsers(users));
    socket?.emit("getUsers");

    return () => {
      socket?.off("users", (users: any) => console.log(users));
    };
  }, [socket]);
  return (
    <div
      className={[
        Styles.onlineContainer,
        width <= 800 ? Styles.onlineContainerMobile : null,
        width <= 800 && !deployed ? Styles.translate100 : Styles.translate0,
      ].join(" ")}
    >
      <Header
        title={"Online ✨"}
        type={width <= 800 ? "chatLeft" : "onlineLeft"}
      />
      <div className={Styles.onlineTopGradiant}></div>
      <Scrollbar className={Styles.onlineUserList}>
        <div className={Styles.onlineBorderLeft}>
          {users.map((user, index) => {
            return (
              <OnlineCharacter
                name={user.id === socket?.id ? username : user.name}
                id={user.id}
                last={users.length - 1 !== index}
                key={index}
              />
            );
          })}
        </div>
      </Scrollbar>
      <div className={Styles.onlineBottomGradiant}></div>
    </div>
  );
};

export default Online;
