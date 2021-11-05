import { useParams } from 'react-router-dom';

export default () => {
  const { id } = useParams<'id'>();
  return (
    <div>
      {' '}
      article id:
      {id}
    </div>
  );
};
