import React, {useMemo} from 'react';
import debounce from 'lodash.debounce';
import {useDispatch, useSelector} from 'react-redux';
import InputText from "../InputText/InputText";
import {PacksGetParams} from "../../../api/api-packs";
import {CardsStateType} from "../../../store/cardsReducer";
import {AppRootStateType} from "../../../store/store";
import {setPacksSearchField} from "../../../store/packsReducer";


type SearchPropsType = {
  fetchData: (payload?: PacksGetParams | CardsStateType) => any
  className: string
}

export const Search = React.memo(({fetchData,className}: SearchPropsType) => {
  const dispatch = useDispatch();
  const searchField = useSelector<AppRootStateType, string>(state => state.packs.searchField)
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

  const debouncedFetchData = useMemo(() => debounce(() => {
    dispatch(fetchData())
  }, 500), [dispatch, fetchData]);

  const onSearchChange = (value: string): void => {
    dispatch(setPacksSearchField(value));
    debouncedFetchData()
  };

  return (
    <div style={{width: '196px'}}>
      <InputText
        className={className}
        disabled={isLoading}
        onChangeText={onSearchChange}
        value={searchField}
        placeholder="Search..."
      />
    </div>
  );
})
