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
import {Navigate} from "react-router-dom";
import PopUpAddPack from "./PopUpAddPack/PopUpAddPack";
import Profile from "../2.profile/Profile";


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

  const [profileOrPackList, setProfileOrPackList] = useState<boolean>(true)

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
  const handleSortPacks = (sortValue: string) => {
    dispatch(setPacksFilter(sortValue))
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
  const addNewPack = (name: string) => {
    dispatch(createPack({cardsPack: {name}}))
  };

  useEffect(() => {
    dispatch(setPacksMyId(isMyId ? userId : null))
    dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId, sortPacks])

  if (!isAuth) return <Navigate to='/'/>

  return (

    <div className={style.packsWrapper}>
      <CheckBoxMyId
        stateBoolean={profileOrPackList}
        setToggleState={setProfileOrPackList}
        name={['Packs list', 'Profile']}
        styleMyPacks={false}/>

      {profileOrPackList
        ? <div>
          <CheckBoxMyId
            stateBoolean={isMyId}
            setToggleState={isMyIdHandler}
            name={['My', 'All']}
            styleMyPacks={true}/>
          <br/>
          <Search
            fetchData={fetchPacks}/>
        </div>
        : <div>
          <Profile/>
          <RangeContainer
            minCardsCount={minCardsCount}
            maxCardsCount={maxCardsCount}
            handleRangeChange={handleRangeChange}/>
          <br/>
          <Search
            fetchData={fetchPacks}/>
        </div>}
      <PopUpAddPack
        logic={addNewPack}
        header={'Add New Pack'}/>
      <PacksTable
        packs={cardPacks}
        userId={userId}
        removePack={handleRemovePacks}
        renamePack={handleRenamePacks}
        sortItems={handleSortPacks}/>
      <Pagination
        totalRecords={cardPacksTotalCount}
        pageLimit={pageCount}
        pageNeighbours={3}
        currentPage={page}
        onPageChanged={onPageChanged}/>
      <PageCountSelect
        selectedPageCount={pageCount}
        options={[5, 10, 15]}
        changeOption={setPageCount}>
        packs
      </PageCountSelect>
    </div>
  );
};