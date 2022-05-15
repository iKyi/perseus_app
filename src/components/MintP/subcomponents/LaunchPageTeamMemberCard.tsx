import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MarkdownParser from "components/Reusable/MarkdownParser";
import { ITeamMember } from "lib/interfaces/ITeamMember";
export type TeamMemberCardPropsType = {
  data: ITeamMember;
};

const LaunchpageTeamMemberCard: React.VFC<TeamMemberCardPropsType> = ({
  data,
}) => {
  const { name, title, description } = data;

  // *************** RENDER *************** //

  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
    >
      {/* <CardMedia
        component="img"
        height={300}
        src={getStrapiMedia(img)}
        width={200}
        sx={{
          display: img ? "block" : "none",
          maxWidth: "100%",
          objectFit: "initial",
          height: "auto",
          backgroundColor: "transparent",
        }}
      /> */}
      <CardContent>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "1.3rem",
            textTransform: "uppercase",
          }}
        >
          {name}
        </Typography>
        {title && (
          <Typography
            sx={{
              color: "secondary.light",
              fontSize: "0.95rem",
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Box
            sx={{
              mt: 3,
              fontSize: "0.9rem",
            }}
          >
            <MarkdownParser>{description}</MarkdownParser>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default LaunchpageTeamMemberCard;
