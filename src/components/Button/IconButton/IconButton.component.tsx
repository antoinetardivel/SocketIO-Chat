import Styles from "./IconButton.module.scss";

interface IIconButton {
  action?: () => void;
  icon: string;
  type?: "submit";
  valid?: boolean;
}

const IconButton: React.FC<IIconButton> = ({ action, icon, type, valid }) => {
  const handleClick = () => {
    if (action) {
      action();
    }
  };
  return (
    <button
      type={type && type}
      className={Styles.iconButton}
      onClick={handleClick}
      style={{
        backgroundColor: valid ? "#E7E5F4" : "rgba(231, 229, 244, 0.16)",
        pointerEvents: valid ? "all" : "none",
      }}
    >
      <img className={Styles.inputButtonIcon} src={icon} alt="" />
    </button>
  );
};

export default IconButton;
