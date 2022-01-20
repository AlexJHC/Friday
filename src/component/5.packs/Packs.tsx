import {PacksTable, Pagination, Search} from '.';
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux';
import debounce from "lodash.debounce";
import {fetchPacks, setPacksCurrentPage, setPacksFromRange, setPacksPageCount} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";
import CheckBoxMyId from "../3.features/CheckBoxMyId/CheckBoxMyId";
import {setIsMyId} from "../../store/appReducer";
import PageCountSelect from "../3.features/PageCountSelect/PageCountSelect";
import {setCardsPageCount} from "../../store/cardsReducer";

export const Packs = () => {
  const dispatch = useDispatch()
  const {
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    minCardsCount,
    maxCardsCount,
    cardsValuesFromRange,
  } = useSelector<AppRootStateType, any>(state => state.packs)

  // isMyId toggle
  const isMyId = useSelector<AppRootStateType, boolean>(state => state.app.isMyId)
  const userId = useSelector<AppRootStateType, string>(state => state.profile.user._id)

  const isMyIdHandler = (isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
    dispatch(setPacksFromRange({values:[0, 1000]}))
  }
  const onPageChanged = (page: number) => {
    dispatch(setPacksCurrentPage(page));
  };
  const setPageCount = (option: number) => {
    dispatch(setPacksPageCount(option))
  }
  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange({values: values}))
  }, 400), [dispatch]);
  const handleRangeChange = (values: number[]) => {
    debouncedFetchData(values)
  };

  useEffect(() => {
    isMyId ? dispatch(fetchPacks({user_id: userId})) : dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId])

  return (
    <div className={style.packsWrapper}>
      <div>
        <Search fetchData={fetchPacks}/>
      </div>
      <br/>
      <CheckBoxMyId isMyId={isMyId} isMyIdHandler={isMyIdHandler}/>
      <div>
        <RangeContainer minCardsCount={minCardsCount} maxCardsCount={maxCardsCount} handleRangeChange={handleRangeChange}/>
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
          pageLimit={pageCount}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
      <div>
        <PageCountSelect options={[10, 20, 50]} changeOption={setPageCount}>
          packs
        </PageCountSelect>
      </div>
    </div>
  );
};
