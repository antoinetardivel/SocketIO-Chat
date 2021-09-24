import { useRef, useState } from "react";
import Styles from "./InputUsername.module.scss";
import arrowRightIcon from "../../assets/icons/rightArrow.svg";
import checkIcon from "../../assets/icons/check.svg";
import IconButton from "../Button/IconButton/IconButton.component";

interface IInputUsername {
  action: (value: string) => void;
  placeholder: string;
  maxChar?: number;
}

const InputUsername: React.FC<IInputUsername> = ({
  action,
  placeholder,
  maxChar,
}) => {
  const [valid, setValid] = useState(false);
  const input = useRef(null);

  return (
    <form className={Styles.formInput}>
      <input
        ref={input}
        autoFocus
        placeholder={placeholder}
        onChange={(e) => {
          if (e.target.value.length >= 3) {
            setValid(true);
            action(e.target.value);
          } else {
            setValid(false);
            action("");
          }
        }}
        className={Styles.input}
        maxLength={maxChar}
      />
      <div className={Styles.inputButton}>
        <IconButton
          type={"submit"}
          icon={valid ? checkIcon : arrowRightIcon}
          valid={!valid}
        />
      </div>
    </form>
  );
};

export default InputUsername;
