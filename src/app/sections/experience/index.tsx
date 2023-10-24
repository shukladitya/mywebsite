import styles from "./styles.module.scss";
const ExperienceSection = () => {
  return (
    <div className={styles.experienceScaffold}>
      <h1>Experience</h1>
      <div className={styles.experienceBlock}>
        <img
          className={styles.experienceImage}
          src="https://www.pngitem.com/pimgs/m/34-341295_target-logo-png-transparent-target-png-download.png"
          alt="experience"
        />
        <div>
          <h2>Target</h2>
          <p>
            Full Stack Developer <span>2019 - Present</span>
          </p>
        </div>
        <p>
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum
        </p>
      </div>
    </div>
  );
};

export default ExperienceSection;
