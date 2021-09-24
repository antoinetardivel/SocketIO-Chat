import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../providers/socket/SocketContext";
import Styles from "./Input.module.scss";
import playIcon from "../../assets/icons/play.svg";
import IconButton from "../Button/IconButton/IconButton.component";
import { TMessageType } from "../../types/messages";

interface IInput {
  placeholder: string;
  maxChar?: number;
  messageType?: TMessageType;
}

const Input: React.FC<IInput> = ({ placeholder, maxChar, messageType }) => {
  const [value, setValue] = useState("");
  const { socket, connected } = useContext(SocketContext);

  const handleSubmit = () => {
    let newValue = value;
    if (messageType !== "normal") {
      newValue = `[${messageType}]${value}`;
    }
    if (newValue.length > 0 && newValue.length <= 32 && socket && connected) {
      socket?.emit("message", newValue);
    }
    setValue("");
  };
  return (
    <>
      <form
        className={Styles.formInput}
        onSubmit={(e) => {
          e.preventDefault();
          if (messageType) {
            handleSubmit();
          } else {
            if (value.length > 0 && value.length <= 32 && socket && connected) {
              socket?.emit("message", value);
            }
          }
        }}
      >
        <input
          autoFocus
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          className={Styles.input}
          maxLength={maxChar}
        />
        <div className={Styles.inputButton}>
          <IconButton type={"submit"} icon={playIcon} valid={connected} />
        </div>
      </form>
    </>
  );
};

export default Input;
