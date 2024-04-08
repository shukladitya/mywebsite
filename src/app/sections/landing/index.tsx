import Link from "@/components/Link";
import styles from "./styles.module.scss";
import SandName from "@/components/SandName";

const LandingSection = () => {
  return (
    <div className={styles.landingScaffold}>
      <div className={styles.intro}>
        <p className={styles.im}>I'm</p>
        <SandName />
      </div>

      {/* <Signature color="white" /> */}
      <div className={styles.linkPanel}>
        <Link text="About" url="http://google.com" />
        <Link text="LinkedIn" url="http://fb.com" />
        <Link text="Github" />
        <Link text="Instagram" />
      </div>
    </div>
  );
};

export default LandingSection;
