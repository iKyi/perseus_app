import usePageData from "hooks/usePageData";

export type AboutUsPagePropsType = {
  children?: any;
};

const AboutUsPage: React.FC<AboutUsPagePropsType> = ({ children }) => {
  const { SeoComponent } = usePageData("about-us-page");

  // *************** RENDER *************** //
  return <>{SeoComponent}</>;
};

export default AboutUsPage;
