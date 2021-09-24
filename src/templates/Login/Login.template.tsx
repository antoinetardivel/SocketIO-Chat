import { useContext, useState } from "react";
import TextButton from "../../components/Button/TextButton/TextButton.component";
import InputUsername from "../../components/InputUsername/InputUsername.component";
import AvatarSelector from "../../layouts/AvatarSelector/AvatarSelector.layout";
import logo from "../../assets/logo.svg";
import Styles from "./Login.module.scss";
import { useHistory } from "react-router-dom";
import { SocketContext } from "../../providers/socket/SocketContext";

interface ILogin {}

const Login: React.FC<ILogin> = () => {
  const locaction = useHistory();
  const [username, setUser] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<null | number>(null);
  const { setUsername, setProfilePhoto } = useContext(SocketContext);
  const handleConnect = () => {
    setUsername(username);
    setProfilePhoto(selectedAvatar);
    locaction.push("/chat");
  };
  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginHeader}>
        <img src={logo} alt="logo" className={Styles.loginLogo} />
      </div>
      <div className={Styles.loginBody}>
        <h1 className={Styles.loginTitle}>Login</h1>
        <div className={Styles.maxWidth}>
          <InputUsername
            action={setUser}
            placeholder={"Your username..."}
            maxChar={32}
          />
        </div>
        <p className={Styles.loginChooseFaceP}>Choose your face</p>
        <div className={Styles.loginSelectAvatar}>
          <AvatarSelector
            select={setSelectedAvatar}
            selected={selectedAvatar}
          />
        </div>
        <div className={Styles.maxWidth}>
          <TextButton
            action={handleConnect}
            value={"Enter"}
            active={
              username.length >= 3 && selectedAvatar != null ? true : false
            }
          />
        </div>
      </div>
      <div className={Styles.loginCreditsContainer}>
        <p className={Styles.loginCredits}> </p>
      </div>
    </div>
  );
};

export default Login;
