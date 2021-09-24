import AvatarButton from "../../components/Button/AvatarButton/AvatarButton.component";
import { avatars } from "./AvatarSelector.config";
import Styles from "./AvatarSelector.module.scss";

interface IAvatarSelector {
  select: (avatarId: number | null) => void;
  selected: number | null;
}

const AvatarSelector: React.FC<IAvatarSelector> = ({ select, selected }) => {
  const handleClick = (index: number) => {
    select(index);
  };
  return (
    <div className={Styles.avatarSelectorContainer}>
      {avatars.map((avatar, index) => {
        return (
          <AvatarButton
            action={handleClick}
            avatar={avatar}
            key={index}
            index={index}
            selected={selected === index}
          />
        );
      })}
    </div>
  );
};

export default AvatarSelector;
