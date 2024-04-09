"use client";
import styles from "./styles.module.scss";

interface LinkProps {
  url?: string;
  text: string;
  color?: string;
  onClick?: (() => void) | false;
}
const Link = (props: LinkProps) => {
  const { url, text, color = "white", onClick = false } = props;
  return onClick ? (
    <span
      onClick={onClick}
      className={styles.linkStyle + " hoverable"}
      style={{ color: color }}
    >
      {text}
    </span>
  ) : (
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
