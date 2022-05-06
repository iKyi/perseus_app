import usePageData from "hooks/usePageData";

export type TokenPagePropsType = {
  children?: any;
};

const TokenPage: React.FC<TokenPagePropsType> = ({ children }) => {
  const { SeoComponent } = usePageData("token-page");

  // *************** RENDER *************** //
  return <>{SeoComponent}</>;
};

export default TokenPage;
