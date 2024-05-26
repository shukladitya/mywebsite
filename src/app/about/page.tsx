import Link from "@/components/Link";
import styles from "./index.module.scss";
const AboutPage = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.textArea}>
        <div className={styles.text}>Nothing much.</div>
        <div className={styles.text}>
          Still trying to brew a lot of things.
          <br />
          <div className={styles.loadingText}>
            Will update soon
            <div className={styles.loadingAnimation}>
              <LoadingAnimation />
            </div>
          </div>
        </div>
        <div className={styles.linkPanel}>
          <Link text="View resume" url="/aditya_resume.pdf" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

const LoadingAnimation = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0">
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        stroke-width="2"
        r="15"
        cx="40"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        stroke-width="2"
        r="15"
        cx="100"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        stroke-width="2"
        r="15"
        cx="160"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
  );
};
