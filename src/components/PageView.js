import {useLocation} from 'react-router-dom';

function usePageViews() {
  const location = useLocation();

  React.useEffect(() => {
    ga('send', 'pageview', location.pathname);
  }, [location]);
}

export default usePageViews;
