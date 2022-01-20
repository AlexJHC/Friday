import {PacksTable, Pagination, Search} from '.';
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux';
import debounce from "lodash.debounce";
import {
  createPack,
  fetchPacks,
  removePacks,
  renamePacks,
  setPacksCurrentPage,
  setPacksFromRange,
  setPacksPageCount
} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";
import CheckBoxMyId from "../3.features/CheckBoxMyId/CheckBoxMyId";
import {setIsMyId} from "../../store/appReducer";
import PageCountSelect from "../3.features/PageCountSelect/PageCountSelect";
import {AddPackForm} from "./AddPackForm/AddPackForm";
import {Navigate} from "react-router-dom";

export const Packs = () => {
  const dispatch = useDispatch()

  // Selectors
  const {
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    minCardsCount,
    maxCardsCount,
    cardsValuesFromRange,
  } = useSelector<AppRootStateType, any>(state => state.packs)
  const isMyId = useSelector<AppRootStateType, boolean>(state => state.app.isMyId)
  const userId = useSelector<AppRootStateType, string>(state => state.profile.user._id)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)

  const isMyIdHandler = (isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
    dispatch(setPacksFromRange({values: [0, 1000]}))
  }
  const handleRemovePacks = (PackId: string) => {
    dispatch(removePacks(PackId, isMyId ? userId : undefined))
  }
  const handleRenamePacks = (_id: string, name: string) => {
    dispatch(renamePacks({_id, name}, isMyId ? userId : undefined))
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
  const addNewPack = (newName: string) => {
    dispatch(createPack({cardsPack: {name: newName}}))
  };

  useEffect(() => {
    dispatch(fetchPacks(isMyId ? {user_id: userId} : {}))
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId])

  if (!isAuth) return <Navigate to='/'/>

  return (
    <div className={style.packsWrapper}>
      <div>
        <Search
          fetchData={fetchPacks}/>
      </div>
      <br/>
      <CheckBoxMyId
        isMyId={isMyId}
        isMyIdHandler={isMyIdHandler}/>
      <div>
        <br/>
        <RangeContainer
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
          handleRangeChange={handleRangeChange}/>
      </div>
      <br/>
      <AddPackForm addPack={addNewPack}/>
      <br/>
      <div>
        <div>
          <PacksTable
            packs={cardPacks}
            userId={userId}
            removePack={handleRemovePacks}
            renamePack={handleRenamePacks}
          />
        </div>
      </div>
      <br/>
      <div>
        <Pagination
          totalRecords={cardPacksTotalCount}
          pageLimit={pageCount}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
      <div>
        <PageCountSelect
          options={[10, 20, 50]}
          changeOption={setPageCount}>
          packs
        </PageCountSelect>
      </div>
    </div>
  );
};
