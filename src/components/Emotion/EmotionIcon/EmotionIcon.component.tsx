import { IEmotion } from "../../../types/emotions";
import Styles from "./EmotionIcon.module.scss";
interface IEmotionIcon {
  emotion: IEmotion;
}
const EmotionIcon: React.FC<IEmotionIcon> = ({ emotion }) => {
  return <span className={Styles.emotionIcon}>{emotion.value}</span>;
};
export default EmotionIcon;
