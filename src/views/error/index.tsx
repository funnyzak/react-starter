import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { ErrorPage } from '@/components';

export default () => {
  const { search } = useLocation();
  const queryValues = queryString.parse(search);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const resetSearchParams = () => {
  //   setSearchParams({
  //     title: '访问遇到了问题'
  //   })
  // }
  // console.log(searchParams.get('title'))

  return (
    <>
      <ErrorPage {...queryValues} />
    </>
  );
};
