"use client";
import styles from "./styles.module.scss";

interface LinkProps {
  url?: string;
  text: string;
  color?: string;
}
const Link = (props: LinkProps) => {
  const { url, text, color = "white" } = props;
  return (
    <a
      className={styles.linkStyle + " hoverable"}
      style={{ color: color }}
      href={url}
    >
      {text}
    </a>
  );
};
export default Link;
