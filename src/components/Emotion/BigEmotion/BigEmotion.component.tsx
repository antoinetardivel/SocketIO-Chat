import { IEmotion } from "../../../types/emotions";
import { TMessageType } from "../../../types/messages";
import Styles from "./BigEmotion.module.scss";

interface IBigEmotion {
  emotion: IEmotion;
  setSelected: (type: TMessageType) => void;
  selected: TMessageType;
}
const BigEmotion: React.FC<IBigEmotion> = ({
  emotion,
  setSelected,
  selected,
}) => {
  return (
    <div
      className={[
        Styles.bigEmotionContainer,
        selected === emotion.type ? Styles.bigEmotionSelected : null,
      ].join(" ")}
      onClick={() => {
        setSelected(selected === emotion.type ? "normal" : emotion.type);
      }}
    >
      <p>{emotion.value}</p>
    </div>
  );
};
export default BigEmotion;
