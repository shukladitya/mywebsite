import Image from "next/image";
import styles from "./styles.module.scss";
import Mountain from "../../../assets/Mountain.jpg";
import Tulsidas from '../../../assets/Tulsidas.jpg'
import Link from "@/components/Link";
const Projects = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.parallax}>
        <Image src={Mountain} alt="Mountain" className={styles.parallaxBG} />
        <div className={styles.linkPanel}>
          <Link text="View" url="http://google.com" />
          <Link text="Download" url="http://fb.com" />
          <Link text="Code" url="http://instagram.com" />
        </div>
      </div>
      <div className={`${styles.parallax} ${styles.margin}`}>
        <Image src={Tulsidas} alt="Tuslidas" className={styles.parallaxBG} />
        <div className={styles.linkPanel}>
          <Link text="View" url="http://google.com" />
          <Link text="How To?" url="http://fb.com" />
          <Link text="Code" url="http://instagram.com" />
        </div>
      </div>
    </div>
  );
};

export default Projects;
