import Styles from "./LineSeparator.module.scss";

interface ILineSeparator {}

const LineSeparator: React.FC<ILineSeparator> = () => {
  return <div className={Styles.lineSeparator}></div>;
};

export default LineSeparator;
