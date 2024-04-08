import Blogs from "./sections/blogs";
import LandingSection from "./sections/landing";
import Projects from "./sections/projects";

export default function Home() {
  return (
    <>
      <LandingSection />
      <Projects />
      <Blogs />
    </>
  );
}
