import {PacksTable, Pagination, Search} from '.';
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import debounce from "lodash.debounce";
import {
  createPack,
  fetchPacks, PacksInitialState,
  removePacks,
  renamePacks,
  setPacksCurrentPage, setPacksFilter,
  setPacksFromRange, setPacksMyId,
  setPacksPageCount, setPacksSearchField
} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";
import CheckBoxMyId from "../3.features/CheckBoxMyId/CheckBoxMyId";
import {setIsMyId} from "../../store/appReducer";
import PageCountSelect from "../3.features/PageCountSelect/PageCountSelect";
import {AddPackForm} from "./AddPackForm/AddPackForm";
import {Navigate} from "react-router-dom";
import PopUp from "../3.features/PopUp/PopUp";
import Button from "../3.features/Button/Button";

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
    sortPacks,
  } = useSelector<AppRootStateType, PacksInitialState>(state => state.packs)
  const isMyId = useSelector<AppRootStateType, boolean>(state => state.app.isMyId)
  const userId = useSelector<AppRootStateType, string>(state => state.profile.user._id)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)

  const [activePopUp, setActivePopUp] = useState<boolean>(true)

  const isMyIdHandler = (isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
    dispatch(setPacksFromRange([0, 1000]))
    dispatch(setPacksSearchField(''))
  }
  const handleRemovePacks = (PackId: string) => {
    dispatch(removePacks(PackId))
  }
  const handleRenamePacks = (_id: string, name: string) => {
    dispatch(renamePacks({_id, name}))
  }
  const handleSortPacks = () => {
    dispatch(setPacksFilter(sortPacks === '0updated' ? '1updated' : '0updated'))
  }
  const onPageChanged = (page: number) => {
    dispatch(setPacksCurrentPage(page));
  };
  const setPageCount = (option: number) => {
    dispatch(setPacksPageCount(option))
  }
  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange(values))
  }, 400), [dispatch]);
  const handleRangeChange = (values: number[]) => {
    debouncedFetchData(values)
  };
  const addNewPack = (newName: string) => {
    dispatch(createPack({cardsPack: {name: newName}}))
  };

  useEffect(() => {
    dispatch(setPacksMyId(isMyId ? userId : null))
    dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId, sortPacks])

  if (!isAuth) return <Navigate to='/'/>

  return (
    <div className={style.packsWrapper}>
      <PopUp
        name={'Add New Pack'}
        popUpStatus={activePopUp}
        popUpToggle={setActivePopUp}>
        {<AddPackForm addPack={addNewPack}/>}
      </PopUp>
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
      {/*<AddPackForm addPack={addNewPack}/>*/}
      <Button padding={'40px'} onClick={() => setActivePopUp(false)}>Add New Pack</Button>
      <br/>
      <div>
        <div>
          <PacksTable
            packs={cardPacks}
            userId={userId}
            removePack={handleRemovePacks}
            renamePack={handleRenamePacks}
            sortValue={sortPacks}
            sortItems={handleSortPacks}/>
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
          selectedPageCount={pageCount}
          options={[10, 20, 50]}
          changeOption={setPageCount}>
          packs
        </PageCountSelect>
      </div>
    </div>
  );
};