import {useDispatch} from 'react-redux';

export const Sort = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button type="button">⬇️</button>
      <button type="button">⬆️</button>
    </div>
  );
};
