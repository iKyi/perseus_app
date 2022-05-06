import usePageData from "hooks/usePageData";

export type NftsPagePropsType = {
  children?: any;
};

const NftsPage: React.FC<NftsPagePropsType> = ({ children }) => {
  const { SeoComponent } = usePageData("nfts-page");

  // *************** RENDER *************** //
  return <>{SeoComponent}</>;
};

export default NftsPage;
