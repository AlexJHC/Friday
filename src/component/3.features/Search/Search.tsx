import { ChangeEvent } from 'react';

import { useDispatch } from 'react-redux';

export const Search = () => {
  const dispatch = useDispatch();
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // dispatch(searchAC(e.currentTarget.value));
    // console.log(e.currentTarget.value);
  };
  return (
    <div>
      Search
      <input type="text" onChange={onSearchChange} />
    </div>
  );
};
