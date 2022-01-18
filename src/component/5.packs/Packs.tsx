import {DoubleRange, Pagination, Search, Sort, PacksTable} from '.';
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks} from './../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import {CardPacksType} from "../../api/api-packs";

export const Packs = () => {
  const dispatch = useDispatch()
  const packs = useSelector<AppRootStateType, CardPacksType[]>(state => state.packs.cardPacks)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChanged = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  // useEffect(() => {
  //   dispatch(fetchPacks())
  // }, [])


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
        <PacksTable packs={packs}/>
      </div>
      <br/>
      <div>
        <Pagination
          // Data Array length
          totalRecords={200}
          pageLimit={10}
          pageNeighbours={3}
          currentPage={currentPage}
          onPageChanged={onPageChanged}/>
      </div>
    </>
  );
};
