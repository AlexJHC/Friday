import {DoubleRange, Pagination, Search, Sort, PacksTable} from '.';
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks} from './../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import {CardPacksType} from "../../api/api-packs";

export const Packs = () => {
  const dispatch = useDispatch()
  const packs = useSelector<AppRootStateType, CardPacksType[]>(state => state.packs.cardPacks)


  // useEffect(() => {
  //   dispatch(fetchPacks())
  // }, [])


  return (
    <div style={{padding: '30px', border: '1px solid blue'}}>
      <div>
        <Search/>
      </div>
      <div>
        <DoubleRange/>
      </div>
      <div>
        <Sort/>
      </div>
      <div>
        <PacksTable packs={packs}/>
      </div>
      <div>
        <Pagination/>
      </div>
    </div>
  );
};
