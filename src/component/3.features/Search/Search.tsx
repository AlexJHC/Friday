import React, {useMemo, useState} from 'react';

import debounce from 'lodash.debounce';

import {useDispatch} from 'react-redux';
import InputText from "../InputText/InputText";
import {PacksGetParams} from "../../../api/api-packs";
import {CardsStateType} from "../../../store/cardsReducer";

type SearchPropsType = {
  fetchData: (payload: PacksGetParams | CardsStateType) => void
}

export const Search = ({fetchData}: SearchPropsType) => {
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState('')

  const onSearchChange = (value: string): void => {
    setSearchField(value);
    debouncedFetchData(value)
  };

  const debouncedFetchData = useMemo(() => debounce((value: string) => {
    dispatch(fetchData({packName: value}))
  }, 3000), [dispatch]);

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
