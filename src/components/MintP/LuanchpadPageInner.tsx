import { Box, CircularProgress, Container } from "@mui/material";
import { sectionMarginBottom } from "constants/styleConstants";
import usePageData from "hooks/usePageData";
import { ITeamMember } from "lib/interfaces/ITeamMember";
import LuanchpadpageTopPart from "./subcomponents/LuanchpadpageTopPart";

export type IMintDataType = {
  name: string;
  id: string;
  mintId: string;
  description: string;
  supply: number;
  image: string;
  mintPrice: number;
  releaseDate: string | false | null;
  discord?: string;
  twitter?: string;
  siteUrl?: string;
  tags?: any;
  roadMap?: string;
  whitepaperUrl?: string;
  candyMachineId: string;
  whitelistOne: boolean;
  whitelistOneText: string;
  whitelistTwo: boolean;
  whitelistTwoText: string;
  whitelistThree: boolean;
  whitelistThreeText: string;
  publicMint: boolean;
  teamMembers?: {
    data: { attributes: ITeamMember }[];
  };
  mintState: "soldOut" | "ended" | "live" | "showTimer" | "showTba";
  whitelistedWallets: Record<any, any>;
};

export type LuanchpadPageInnerPropsType = {};

const LuanchpadPageInner: React.VFC<LuanchpadPageInnerPropsType> = () => {
  const { pageData } = usePageData("mint-data");
  console.log(pageData);
  // *************** RENDER *************** //
  if (!pageData) {
    return (
      <Box
        sx={{
          width: 1440,
          maxWidth: "100%",
          margin: "0 auto",
          py: sectionMarginBottom,
        }}
      >
        <Container>
          <CircularProgress />
        </Container>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: 1440,
        maxWidth: "100%",
        margin: "0 auto",
        py: sectionMarginBottom,
      }}
    >
      <Container>
        <Box sx={{ pt: [2, 2, 4] }}>
          <LuanchpadpageTopPart data={pageData} />
          {/* <LaunchpadpageBottomTabsPart data={pageData} /> */}
        </Box>
      </Container>
    </Box>
  );
};

export default LuanchpadPageInner;
