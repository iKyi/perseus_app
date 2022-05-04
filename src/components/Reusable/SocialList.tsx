import { IconButton, Stack, Link, Theme, SxProps } from "@mui/material";
import { Twitter, LinkedIn, Facebook } from "@mui/icons-material";

const SocialIconButton: React.FC<{
  children: any;
  url: string;
}> = ({ children, url }) => {
  return (
    <IconButton
      component={Link}
      href={url}
      sx={{
        fontSize: "1.4rem",
        width: 40,
        height: 40,
        color: "secondary.contrastText",
        borderRadius: 0,
        transition: "all .2s",
        "&:hover": {
          borderColor: "secondary.main",
          color: "secondary.main",
        },
      }}
      target="_blank"
      rel="noopener"
    >
      {children}
    </IconButton>
  );
};

export type SocialListPropsType = {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  sx?: SxProps<Theme>;
};

const SocialList: React.VFC<SocialListPropsType> = ({
  facebook,
  twitter,
  linkedin,
  sx: importedSx,
}) => {
  // *************** RENDER *************** //
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        display: "inline-flex",
        ...importedSx,
      }}
    >
      {facebook && (
        <SocialIconButton url={facebook}>
          <Facebook color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
      {twitter && (
        <SocialIconButton url={twitter}>
          <Twitter color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
      {linkedin && (
        <SocialIconButton url={linkedin}>
          <LinkedIn color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
    </Stack>
  );
};

export default SocialList;
