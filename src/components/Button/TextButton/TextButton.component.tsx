import Styles from "./TextButton.module.scss";

interface ITextButton {
  action?: () => void;
  active?: boolean;
  value: string;
}

const TextButton: React.FC<ITextButton> = ({ action, active, value }) => {
  const handleClick = () => {
    if (action) {
      action();
    }
  };
  return (
    <button
      className={Styles.textButton}
      onClick={handleClick}
      style={{
        backgroundColor: active ? "#E7E5F4" : "rgba(231, 229, 244, 0.16)",
        pointerEvents: active ? "all" : "none",
      }}
    >
      {value}
    </button>
  );
};

export default TextButton;
