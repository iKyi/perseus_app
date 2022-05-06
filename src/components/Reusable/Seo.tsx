import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { getStrapiMedia } from "lib/theme/media";
import { StrapiContext } from "providers/StrapiPublicProvider";

export type SeoPropsType = {
  children?: any;
  seo: any;
};

const SeoComp: React.VFC<SeoPropsType> = ({ children, seo }) => {
  const { seo: defaultSeo, siteName } = useContext(StrapiContext);
  const seoWithDefaults = seo
    ? {
        ...defaultSeo,
        ...seo,
      }
    : defaultSeo;
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle:
      seoWithDefaults.metaTitle && seoWithDefaults.metaTitle !== siteName
        ? `${seoWithDefaults.metaTitle} | ${siteName}`
        : siteName,
    // Get full image URL
    shareImage: seoWithDefaults.shareImage
      ? getStrapiMedia(seoWithDefaults.shareImage)
      : null,
  };

  return (
    <Helmet>
      {fullSeo.metaTitle && <title>{fullSeo.metaTitle}</title>}
      {fullSeo.metaTitle && (
        <meta property="og:title" content={fullSeo.metaTitle} />
      )}
      {fullSeo.metaTitle && (
        <meta name="twitter:title" content={fullSeo.metaTitle} />
      )}

      {fullSeo.metaDescription && (
        <meta name="description" content={fullSeo.metaDescription} />
      )}
      {fullSeo.metaDescription && (
        <meta property="og:description" content={fullSeo.metaDescription} />
      )}
      {fullSeo.metaDescription && (
        <meta name="twitter:description" content={fullSeo.metaDescription} />
      )}

      {fullSeo.shareImage && (
        <meta property="og:image" content={fullSeo.shareImage} />
      )}
      {fullSeo.shareImage && (
        <meta name="twitter:image" content={fullSeo.shareImage} />
      )}
      {fullSeo.shareImage && <meta name="image" content={fullSeo.shareImage} />}

      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SeoComp;
