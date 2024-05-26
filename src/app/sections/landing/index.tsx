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
        <Link text="About" url="/about" />
        <Link text="LinkedIn" url="https://www.linkedin.com/in/adityashk/" />
        <Link text="Github" url="https://github.com/shukladitya" />
        <Link text="Instagram" url="https://www.instagram.com/its.aurelius/" />
      </div>
    </div>
  );
};

export default LandingSection;
