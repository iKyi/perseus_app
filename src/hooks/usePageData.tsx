import { useAppDispatch, useAppSelector } from "app/hooks";
import SeoComp from "components/Reusable/Seo";
import { addPageData } from "features/global/globalSlice";
import { axiosStrapiGetter } from "lib/axios/axiosGetter";
import { useEffect, useMemo, useState } from "react";

const usePageData = (url: string, notAttributes?: boolean) => {
  const { pagesData } = useAppSelector((state) => state.global);
  const [pageData, setPageData] = useState<any>(undefined);
  const existingData = pagesData[url];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!existingData) {
      axiosStrapiGetter(`${url}?populate=*`).then((resp) => {
        const { data: responseData } = resp;
        if (notAttributes) {
          setPageData(responseData);
          dispatch(addPageData({ data: responseData, pageKey: url }));
        } else {
          setPageData(responseData?.attributes);
          dispatch(
            addPageData({ data: responseData?.attributes, pageKey: url })
          );
        }
      });
    } else {
      setPageData(existingData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, existingData]);

  const SeoComponent = useMemo(() => {
    const { seo } = pageData || {};
    if (seo) {
      return <SeoComp seo={seo} />;
    }
    return null;
  }, [pageData]);

  return { pageData, SeoComponent };
};

export default usePageData;
