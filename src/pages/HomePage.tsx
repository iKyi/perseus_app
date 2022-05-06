import { Container } from "@mui/material";
import AppBox from "components/Home/AppBox/AppBox";
import MilestonesHome from "components/Home/MilestonesHome/MilestonesHome";
import NftsBox from "components/Home/NftsBox/NftsBox";
import ContactBox from "components/Reusable/ContactBox";
import TopFillerBox from "components/Reusable/TopFillerBox";
import usePageData from "hooks/usePageData";
import ISectionHeaderStrapi from "utils/types/ISectionHeader";

export type HomePagePropsType = {};

const HomePage: React.FC<HomePagePropsType> = () => {
  const { SeoComponent, pageData } = usePageData("home-page");

  const { contactBoxHeader, milestonesBoxHeader } = pageData || {};

  // *************** RENDER *************** //
  return (
    <>
      {SeoComponent}
      <TopFillerBox />
      {milestonesBoxHeader && (
        <MilestonesHome header={milestonesBoxHeader as ISectionHeaderStrapi} />
      )}
      <AppBox />
      <NftsBox />
      {contactBoxHeader && (
        <Container
          sx={{
            pt: [3, 3, 7],
          }}
        >
          <ContactBox header={contactBoxHeader as ISectionHeaderStrapi} />
        </Container>
      )}
    </>
  );
};

export default HomePage;
