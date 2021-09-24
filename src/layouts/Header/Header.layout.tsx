import backArrow from "../../assets/icons/backArrow.svg";
import onlinePerson from "../../assets/icons/onlinePerson.svg";
import logOut from "../../assets/icons/logOut.svg";
import IconButton from "../../components/Button/IconButton/IconButton.component";
import Styles from "./Header.module.scss";
import { Dispatch, SetStateAction, useContext } from "react";
import { SocketContext } from "../../providers/socket/SocketContext";
import { useHistory } from "react-router-dom";

interface IHeader {
  title?: string;
  image?: string;
  type: "online" | "chatLeft" | "onlineLeft" | "chatRight";
  setOnline?: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<IHeader> = ({ title = "", type, image, setOnline }) => {
  const {
    socket,
    setProfilePhoto,
    setUsername,
    setConnected,
    connected,
    setDeployed,
    setSocket,
    deployed = false,
  } = useContext(SocketContext);
  const location = useHistory();
  return (
    <div className={Styles.headerContainer}>
      <div className={Styles.balanceCenter}>
        {(type === "online" || type === "onlineLeft") && (
          <IconButton
            action={() => {
              setProfilePhoto(null);
              setUsername("");
              setConnected(false);
              socket?.close();
              setSocket(null);
              location.push("/");
            }}
            icon={logOut}
            valid={connected}
          />
        )}
        {type === "chatLeft" && (
          <IconButton
            action={() => setDeployed(!deployed)}
            icon={backArrow}
            valid={connected}
          />
        )}
      </div>
      {image && <img className={Styles.headerLogo} src={image} alt="Logo" />}
      {!image && <h2 className={Styles.headerTitle}>{title}</h2>}
      <div className={Styles.balanceCenter}>
        {type === "online" && (
          <IconButton
            action={() => setDeployed(!deployed)}
            icon={onlinePerson}
            valid={connected}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
