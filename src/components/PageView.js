import React from 'react';
import {useLocation} from 'react-router-dom';

const GA_MEASUREMENT_ID = process.env.GTAG_KEY;
// currently not needed because global tag (gtag) is used.
function usePageViews() {
  const location = useLocation();

  React.useEffect(() => {
    window.gtag('config', GA_MEASUREMENT_ID, {page_path: location.pathname});
  }, [location]);
}

export default usePageViews;
