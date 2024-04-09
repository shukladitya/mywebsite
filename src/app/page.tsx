import Blogs from "./sections/blogs";
import Contact from "./sections/contact";
import LandingSection from "./sections/landing";
import Projects from "./sections/projects";

export default function Home() {
  return (
    <>
      <LandingSection />
      <Projects />
      <Blogs />
      <Contact />
    </>
  );
}
