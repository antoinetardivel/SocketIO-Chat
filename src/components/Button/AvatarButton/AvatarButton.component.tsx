import Styles from "./AvatarButton.module.scss";
interface IAvatarButton {
  selected: boolean;
  avatar: string;
  action: (index: number) => void;
  index: number;
}
const AvatarButton: React.FC<IAvatarButton> = ({
  selected,
  avatar,
  index,
  action,
}) => {
  return (
    <div
      className={[
        Styles.avatarBox,
        selected ? Styles.selectedAvatarBox : null,
      ].join(" ")}
      key={index}
      onClick={() => action(index)}
    >
      <img src={avatar} alt="Avatar" className={Styles.avatar} />
      {selected && <span className={Styles.selectedTag}>🤙</span>}
    </div>
  );
};
export default AvatarButton;
