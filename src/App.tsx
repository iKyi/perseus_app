import { Route, Routes } from "react-router";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import NftsPage from "./pages/NftsPage";
import ProjectsPage from "./pages/ProjectsPage";
import RoadmapPage from "./pages/RoadmapPage";
import TokenPage from "./pages/TokenPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<HomePage />} index />
      <Route element={<AboutUsPage />} path="/about-us" />
      <Route element={<NftsPage />} path="/nfts" />
      <Route element={<ProjectsPage />} path="/projects" />
      <Route element={<RoadmapPage />} path="/roadmap" />
      <Route element={<TokenPage />} path="/token" />
    </Routes>
  );
};

export default App;
