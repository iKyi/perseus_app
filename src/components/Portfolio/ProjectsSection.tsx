import { Box } from "@mui/material";
import { sectionMarginBottom } from "constants/styleConstants";
// import usePageData from "hooks/usePageData";
// import { useMemo } from "react";
import PortfolioSectionHeader from "./PortfolioSectionHeader";
// import ProjectListEntry from "./ProjectListEntry";
import projectsComingSoon from "assets/images/portfolio/projectsComingSoon.png";

export type ProjectsSectionPropsType = {};

const ProjectsSection: React.FC<ProjectsSectionPropsType> = () => {
  // const { pageData } = usePageData("projects", true);

  // const { totalProjects, ethereumProjects, solanaProjects } = useMemo(() => {
  //   if (!pageData) {
  //     return { totalProjects: 0, ethereumProjects: 0, solanaProjects: 0 };
  //   }
  //   const totalProjects = pageData.length;
  //   const ethereumProjects = pageData.filter(
  //     (item: any) => item.attributes.type !== "Ethereum"
  //   ).length;
  //   const solanaProjects = pageData.filter(
  //     (item: any) => item.attributes.type !== "Solana"
  //   ).length;
  //   return { totalProjects, ethereumProjects, solanaProjects };
  // }, [pageData]);

  // *************** RENDER *************** //
  // if (!pageData) return null;
  return (
    <Box
      sx={{
        mb: sectionMarginBottom,
      }}
    >
      <PortfolioSectionHeader
        title="Projects"
        // items={[
        //   { title: "Total Projects", value: totalProjects },
        //   { title: "Ethereum Projects", value: ethereumProjects },
        //   { title: "Solana Projects", value: solanaProjects },
        // ]}
      />
      <img src={projectsComingSoon} alt="coming soon" className="respImg" />
      {/* {pageData.map((item: any) => {
        return <ProjectListEntry key={item.attributes.name} data={item} />;
      })} */}
    </Box>
  );
};

export default ProjectsSection;
