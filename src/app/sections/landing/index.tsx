import Link from "@/components/Link";
import Signature from "@/components/signature";

const LandingSection = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
      }}
    >
      <Signature color="white" />
      <Link />
    </div>
  );
};

export default LandingSection;
