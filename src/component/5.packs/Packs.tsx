import {DoubleRange, PacksTable, Pagination, Search, Sort} from '.';
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks, setPacksCurrentPage} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";

export const Packs = () => {
  const dispatch = useDispatch()
  const {cardPacks, page} = useSelector<AppRootStateType, any>(state => state.packs)

  // Pagination
  const onPageChanged = useCallback((page) => {
      dispatch(setPacksCurrentPage({page}));
    }, []);

  useEffect(() => {
    dispatch(fetchPacks())
  }, [page])

  return (
    <>
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
        <PacksTable packs={cardPacks}/>
      </div>
      <br/>
      <div>
        <Pagination
          // Data Array length
          totalRecords={200}
          pageLimit={10}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
    </>
  );
};
