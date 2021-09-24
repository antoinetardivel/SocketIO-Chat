import { useState } from "react";
import BigEmotion from "../../components/Emotion/BigEmotion/BigEmotion.component";
import { TMessageType } from "../../types/messages";
import { emotions } from "./EmotionList.config";
import Styles from "./EmotionList.module.scss";

interface IEmotionList {
  changeType: (type: TMessageType) => void;
}
const EmotionList: React.FC<IEmotionList> = ({ changeType }) => {
  const [selected, setSelected] = useState<TMessageType>("normal");
  const handleSelect = (type: TMessageType) => {
    if (type === selected) {
      changeType("normal");
      setSelected("normal");
    } else {
      setSelected(type);
      changeType(type);
    }
  };
  return (
    <div className={Styles.EmotionListContainer}>
      {emotions.map((emotion, index) => {
        return (
          <BigEmotion
            emotion={emotion}
            key={index}
            setSelected={handleSelect}
            selected={selected}
          />
        );
      })}
    </div>
  );
};
export default EmotionList;
