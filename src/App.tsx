import { Route, Routes, useLocation } from "react-router";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import NftsPage from "./pages/NftsPage";
import PortfolioPage from "./pages/PortfolioPage";
import RoadmapPage from "./pages/RoadmapPage";
import TokenPage from "./pages/TokenPage";
import Header from "components/Layout/Header";
import SeoComp from "components/Reusable/Seo";
import { useContext, useEffect } from "react";
import { StrapiContext } from "providers/StrapiPublicProvider";
import Footer from "components/Layout/Footer";
import LuanchpadPageInner from "components/MintP/LuanchpadPageInner";
import SnackbarProvider from "providers/SnackbarProvider";
import BlockingSnabarsProvider from "providers/BlockingSnabarsProvider";

const App: React.FC = () => {
  const { seo } = useContext(StrapiContext);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Header />
      <SeoComp seo={seo} />
      <Routes>
        <Route element={<HomePage />} index />
        <Route element={<AboutUsPage />} path="/about-us" />
        <Route element={<LuanchpadPageInner />} path="/mint" />
        <Route element={<NftsPage />} path="/nfts" />
        <Route element={<PortfolioPage />} path="/portfolio" />
        <Route element={<RoadmapPage />} path="/roadmap" />
        <Route element={<TokenPage />} path="/token" />
      </Routes>
      <Footer />
      <SnackbarProvider />
      <BlockingSnabarsProvider />
    </>
  );
};

export default App;
