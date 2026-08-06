import s from "./SkipContentLink.module.css";

const SkipContentLink = () => {
  return (
    <a className={s.skipLink} href="#main-content" target="_self">
      Skip to main content
    </a>
  );
};

export default SkipContentLink;
