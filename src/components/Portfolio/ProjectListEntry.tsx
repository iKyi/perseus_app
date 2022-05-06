import {
  Box,
  CardActionArea,
  Stack,
  Typography,
  Link as MUILink,
} from "@mui/material";
import SocialList from "components/Reusable/SocialList";
import { getStrapiMedia } from "lib/theme/media";

const ValueEntry: React.FC<{
  title: string;
  value: string;
  greenValue?: boolean;
}> = ({ title, value, greenValue }) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        py: 1,
        pr: 1,
      }}
    >
      <Typography
        component="span"
        sx={{ color: "common.gray", fontWeight: 300 }}
      >
        {title}:
      </Typography>
      <Typography
        component="span"
        sx={{
          ml: 0.8,
          color: greenValue ? "rgba(103, 255, 146, 1)" : undefined,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export type ProjectListEntryPropsType = {
  data: any;
};

const ProjectListEntry: React.FC<ProjectListEntryPropsType> = ({ data }) => {
  const { attributes } = data;
  const {
    description,
    investedAmount,
    links,
    logo,
    name,
    percentageOwned,
    profit,
  } = attributes ?? {};

  const { siteUrl, discord, twitter } = links ?? {};
  // *************** RENDER *************** //
  if (!attributes) {
    return null;
  }
  return (
    <Box
      sx={{
        "&:not(:first-of-type)": {
          marginTop: 2,
        },
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        borderBottom: ["1px solid", "1px solid", "0"],
        borderColor: "common.gray",
        pb: [1, 1, 0],
      }}
    >
      <CardActionArea
        sx={{
          display: "inline-flex",
          maxWidth: 140,
          "&:hover": {
            ".linkBar": {
              borderColor: "primary.main",
            },
          },
        }}
        component={MUILink}
        target="_blank"
        rel="noopener"
        href={siteUrl}
      >
        <Box
          className="linkBar"
          sx={{
            borderLeft: "2px solid",
            borderColor: "common.gray",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logo && <img src={getStrapiMedia(logo)} alt={`logo for ${name}`} />}
        </Box>
      </CardActionArea>
      <Box sx={{ px: 1, minWidth: [0, 0, 230] }}>
        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: "1.2rem" }}>{name}</Typography>
          {siteUrl && (
            <MUILink
              underline={"hover"}
              target="_blank"
              rel="noopener"
              href={siteUrl}
              sx={{ fontSize: "0.95rem", color: "common.gray" }}
            >
              {siteUrl}
            </MUILink>
          )}
          <SocialList discord={discord} twitter={twitter} />
        </Stack>
      </Box>
      <Box sx={{ px: 1, flex: 1 }}>
        <Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <ValueEntry title="Invested amount" value={investedAmount} />
            <ValueEntry title="Percentage owned" value={percentageOwned} />
            <ValueEntry title="Realized profit" value={profit} greenValue />
          </Box>
          {description && (
            <Typography sx={{ color: "#E2E2E2" }}>{description}</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectListEntry;
