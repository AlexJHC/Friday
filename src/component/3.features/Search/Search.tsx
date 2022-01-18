import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
import InputText from "../InputText/InputText";
import {fetchPacks} from "../../../store/packsReducer";

export const Search = () => {
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState('')

  const onSearchChange = (value: string): void => {
    setSearchField(value);
    dispatch(fetchPacks({packName: value}))
  };

  return (
    <div>
      <InputText
        onChangeText={onSearchChange}
        value={searchField}
        placeholder="enter name..."
      />
    </div>
  );
};
