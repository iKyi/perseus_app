import { Box, Grid, Tab, Tabs } from "@mui/material";
import MarkdownParser from "components/Reusable/MarkdownParser";
import SquareBorderBox from "components/Reusable/SquareBorderBox";
import { useState } from "react";
import { IMintDataType } from "../LuanchpadPageInner";
import LaunchpageTeamMemberCard from "./LaunchPageTeamMemberCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 1, py: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `darkTerminalTab-tab-${index}`,
    "aria-controls": `darkTerminalTab-tabpanel-${index}`,
  };
}

export type LaunchpadpageBottomTabsPartPropsType = {
  data: IMintDataType;
};

const LaunchpadpageBottomTabsPart: React.VFC<
  LaunchpadpageBottomTabsPartPropsType
> = ({ data: { roadMap, teamMembers } }) => {
  const [value, setValue] = useState(0);
  const localMembers =
    teamMembers?.data?.map((item) => item.attributes) ?? null;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabStyles = {
    fontSize: "0.9rem",
    py: [0, 0, 1],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const innerTabStyles = {
    backgroundColor: `rgba(0,0,0,0.16)`,
  };

  // *************** RENDER *************** //
  if (!localMembers && !roadMap) return null;
  return (
    <SquareBorderBox
      sx={{
        mt: [1.5, 1.5, 2.5],
        p: [0.7, 0.7, 1],
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Dark Terminal Content Tabs"
        scrollButtons="auto"
        variant="scrollable"
      >
        {roadMap && (
          <Tab
            sx={{
              ...innerTabStyles,
            }}
            label={
              <Box
                sx={{
                  ...TabStyles,
                  color: value === 0 ? "common.white" : "primary.light",
                }}
              >
                ROADMAP
              </Box>
            }
            {...a11yProps(0)}
          />
        )}
        {localMembers && (
          <Tab
            sx={{
              ...innerTabStyles,
            }}
            label={
              <Box
                sx={{
                  ...TabStyles,
                  color: value === 1 ? "common.white" : "primary.light",
                }}
              >
                TEAM
              </Box>
            }
            {...a11yProps(1)}
          />
        )}
      </Tabs>
      {roadMap && (
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              wordWrap: "break-word",
              fontWeight: 300,
            }}
          >
            <MarkdownParser>{roadMap}</MarkdownParser>
          </Box>
        </TabPanel>
      )}
      {localMembers && (
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              wordWrap: "break-word",
              fontWeight: 300,
            }}
          >
            <Grid container spacing={[2, 2, 3]}>
              {localMembers.map((member) => (
                <Grid item key={member.name} xs={12} sm={6} md={4} lg={3}>
                  <LaunchpageTeamMemberCard data={member} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
      )}
    </SquareBorderBox>
  );
};

export default LaunchpadpageBottomTabsPart;
