import {DoubleRange, Pagination, Search, Sort, PacksTable} from '.';
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks} from './../../store/packsReducer';
import {AppRootStateType} from "../../store/store";

export const Packs = () => {
  const dispatch = useDispatch()
  const packs = useSelector<AppRootStateType, any>(state => state.packs.cardPacks)
  console.log(packs)

  useEffect(() => {
    dispatch(fetchPacks())
  }, [])

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
        <PacksTable/>
      </div>
      <div>
        <Pagination/>
      </div>
    </div>
  );
};
