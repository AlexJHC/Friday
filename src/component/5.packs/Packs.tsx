import {PacksTable, Pagination, Search} from '.';
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks, setPacksCurrentPage} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";

export const Packs = () => {
  const dispatch = useDispatch()
  const {
    cardPacks,
    page,
    cardPacksTotalCount,
    minCardsCount,
    maxCardsCount,
    cardsValuesFromRange,
  } = useSelector<AppRootStateType, any>(state => state.packs)

  // Pagination
  const onPageChanged = (page: number) => {
    dispatch(setPacksCurrentPage(page));
  };

  useEffect(() => {
    dispatch(fetchPacks())
  }, [dispatch, page, cardsValuesFromRange])

  return (
    <div className={style.packsWrapper}>
      <div>
        <Search/>
      </div>

      <br/>
      <div>
        <RangeContainer minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}/>
      </div>
      <br/>
      {/*<div>*/}
      {/*  <Sort/>*/}
      {/*</div>*/}
      <div style={{display: "flex", justifyContent: "flex-start", alignItems: "self-start"}}>
        <div style={{display: "flex", minWidth: '200px', justifyContent: 'center', flexGrow: '1'}}>
          <PacksTable packs={cardPacks}/>
        </div>
      </div>
      <br/>
      <div>
        <Pagination
          // Data Array length
          totalRecords={cardPacksTotalCount}
          pageLimit={10}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
    </div>
  );
};
