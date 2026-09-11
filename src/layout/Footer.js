import dynamic from "next/dynamic";

const CinematicFooter = dynamic(
  () =>
    import("../components/ui/motion-footer").then((mod) => mod.CinematicFooter),
  { ssr: false }
);

const Footer = () => {
  return <CinematicFooter />;
};

export default Footer;
